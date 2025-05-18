from http import HTTPStatus
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import User, UserVerification
from backend.schemas import (
    LoginSchema,
    Message,
    Token,
    verifyCodeSchema,
)
from backend.security import create_access_token, verify_password
from helper.utils import send_sms

router = APIRouter(prefix='/auth', tags=['auth'])
T_Session = Annotated[Session, Depends(get_session)]


@router.post('/login', response_model=Message)
def login_request(
    form_data: LoginSchema,
    session: T_Session,
):
    user = session.scalar(select(User).where(User.email == form_data.email))

    if not user:
        raise HTTPException(status_code=HTTPStatus.UNAUTHORIZED, detail='Incorrect email')

    send_sms(user, session)

    return {'message': 'Verification code sent'}


@router.post('/verify-code', response_model=Token)
def verify_code(data: verifyCodeSchema, session: T_Session):
    user = session.scalar(select(User).where(User.email == data.email))

    if not user:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail='User not found')

    user_verification = session.scalar(
        select(UserVerification).where(UserVerification.user_id == user.id)
    )

    if not user_verification:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Verification code not found'
        )

    if not verify_password(data.verification_code, user_verification.verification_code):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail='Invalid verification code'
        )

    user_verification.is_verified = True
    session.commit()

    user_data = session.scalar(select(User).where(User.id == user_verification.user_id))

    access_token = create_access_token(data={'sub': user_data.email})

    return {'access_token': access_token, 'token_type': 'bearer'}


@router.post('/resend-code', response_model=Message)
def resend_code(data: LoginSchema, session: T_Session):
    user = session.scalar(select(User).where(User.email == data.email))

    if not user:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail='User not found')

    user_verification = session.scalar(
        select(UserVerification).where(UserVerification.user_id == user.id)
    )

    if user_verification and user_verification.is_verified:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail='User already verified'
        )

    send_sms(user, session)

    return {'message': 'Code resent successfully'}
