from datetime import datetime

from sqlalchemy import Boolean, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, registry

table_registry = registry()


@table_registry.mapped_as_dataclass
class User:
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    full_name: Mapped[str]
    cpf: Mapped[str]
    phone: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    permission_level: Mapped[str] = mapped_column(default='comum')
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )


@table_registry.mapped_as_dataclass
class UserVerification:
    __tablename__ = 'user_verifications'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey('users.id'), unique=True
    )  # Chave estrangeira
    verification_code: Mapped[str] = mapped_column(String(6), unique=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())
