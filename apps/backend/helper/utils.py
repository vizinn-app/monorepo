import random
import os
from http import HTTPStatus

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from twilio.rest import Client

from backend.models import User, UserVerification
from backend.settings import Settings

client = Client(Settings().account_sid, Settings().auth_token)


def send_sms(db_user: User, session: Session):
    # Gera um código de 6 dígitos
    verification_code = f'{random.randint(100000, 999999)}'

    # Sempre imprimir o código no console em qualquer ambiente
    print(f"\n===== VERIFICATION CODE =====")
    print(f"Email: {db_user.email}")
    print(f"Code: {verification_code}")
    print(f"=============================\n")

    # Busca se já existe uma verificação para este usuário
    user_verification = session.scalar(
        select(UserVerification).where(UserVerification.user_id == db_user.id)
    )

    # Atualiza ou cria um novo registro de verificação
    # IMPORTANTE: Armazenamos o código diretamente, não o hash
    if user_verification:
        user_verification.verification_code = verification_code
        user_verification.is_verified = False
    else:
        user_verification = UserVerification(
            user_id=db_user.id,
            verification_code=verification_code,
            is_verified=False,
        )
        session.add(user_verification)

    session.commit()

    try:
        # Em ambiente de desenvolvimento, pulamos o envio real do SMS
        environment = os.getenv("ENVIRONMENT", "development")
        if environment.lower() == "development":
            print(f"DEBUG - SMS would be sent to +55{db_user.phone} in production")
            return

        # Em produção, tenta enviar o SMS
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
