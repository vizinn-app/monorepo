import random
import os
from http import HTTPStatus

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from twilio.rest import Client

from backend.models import User, UserVerification
from backend.security import get_password_hash
from backend.settings import Settings

client = Client(Settings().account_sid, Settings().auth_token)


def send_sms(db_user: User, session: Session):
    verification_code = f'{random.randint(100000, 999999)}'

    environment = os.getenv("ENVIRONMENT", "development")
    if environment.lower() == "development":
        print(f"DEBUG - Verification code for {db_user.email}: {verification_code}")

    user_verification = session.scalar(
        select(UserVerification).where(UserVerification.user_id == db_user.id)
    )

    if user_verification:
        user_verification.verification_code = get_password_hash(verification_code)
        user_verification.is_verified = False
    else:
        user_verification = UserVerification(
            user_id=db_user.id,
            verification_code=get_password_hash(verification_code),
            is_verified=False,
        )
        session.add(user_verification)

    session.commit()

    try:
        # Em ambiente de desenvolvimento, podemos pular o envio real do SMS
        environment = os.getenv("ENVIRONMENT", "development")
        if environment.lower() == "development":
            print(f"DEBUG - Verification code for {db_user.email}: {verification_code}")
            print(f"DEBUG - SMS would be sent to +55{db_user.phone} in production")
            return

        # Apenas tenta enviar SMS em produção
        client.messages.create(
            body=f'Your verification code is: {verification_code}',
            from_=Settings().twilio_phone_number,
            to=f'+55{db_user.phone}',
        )
    except Exception as e:
        # Loga o erro, mas não falha a operação em ambiente de desenvolvimento
        if environment.lower() == "development":
            print(f"WARNING - SMS would be sent in production: {str(e)}")
        else:
            raise HTTPException(
                status_code=HTTPStatus.INTERNAL_SERVER_ERROR,
                detail=f'Failed to send SMS: {str(e)}',
            )
