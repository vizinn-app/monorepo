from http import HTTPStatus

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import User, UserVerification
from backend.schemas import (
    LoginSchema,
    Message,
    Token,
    UserList,
    UserPublic,
    UserSchema,
    verifyCodeSchema,
)
from backend.security import (
    create_access_token,
    get_current_user,
)
from helper.utils import send_sms

app = FastAPI()


@app.post('/user/', status_code=HTTPStatus.CREATED, response_model=UserPublic)
def create_user(user: UserSchema, session: Session = Depends(get_session)):
    db_user = session.scalar(select(User).where(User.email == user.email))

    if db_user:
        if db_user.email == user.email:
            raise HTTPException(
                status_code=HTTPStatus.CONFLICT, detail='Email already registered'
            )

    db_user = User(
        full_name=user.full_name,
        cpf=user.cpf,
        phone=user.phone,
        email=user.email,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)

    send_sms(db_user, session)

    return db_user


@app.get('/users/', response_model=UserList)
def read_users(skip: int = 0, limit: int = 100, session: Session = Depends(get_session)):
    users = session.scalars(select(User).offset(skip).limit(limit)).all()
    return {'users': users}


@app.get('/user/{user_id}', response_model=UserPublic)
def read_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN, detail='Not enough permissions'
        )

    user = session.scalars(select(User).where(User.id == user_id)).first()
    return user


@app.delete('/user/{user_id}', response_model=Message)
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN, detail='Not enough permissions'
        )

    db_user = session.scalar(select(User).where(User.id == user_id))

    if not db_user:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail='User not found')

    session.delete(db_user)
    session.commit()

    return {'message': 'User deleted'}


@app.post('/login/', response_model=Message)
def login_request(
    form_data: LoginSchema,
    session: Session = Depends(get_session),
):
    user = session.scalar(select(User).where(User.email == form_data.email))

    if not user:
        raise HTTPException(
            status_code=HTTPStatus.UNAUTHORIZED, detail='Incorrect email or password'
        )

    send_sms(user, session)

    return {'message': 'Verification code sent'}


@app.post('/verify-code/', response_model=Token)
def verify_code(data: verifyCodeSchema, session: Session = Depends(get_session)):
    user_verification = session.scalar(
        select(UserVerification).where(
            UserVerification.verification_code == data.verification_code
        )
    )

    if not user_verification:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Verification code not found'
        )

    if user_verification.verification_code != data.verification_code:
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST, detail='Invalid verification code'
        )

    user_verification.is_verified = True
    session.commit()

    user_data = session.scalar(select(User).where(User.id == user_verification.user_id))

    access_token = create_access_token(data={'sub': user_data.email})

    return {'access_token': access_token, 'token_type': 'bearer'}


@app.post('/resend-code/', response_model=Message)
def resend_code(data: LoginSchema, session: Session = Depends(get_session)):
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
