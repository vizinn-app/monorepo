from datetime import datetime
from typing import List

from sqlalchemy import Boolean, Column, ForeignKey, String, Table, Text, func
from sqlalchemy.orm import Mapped, mapped_column, registry, relationship

table_registry = registry()

announcement_category = Table(
    'announcement_category',
    table_registry.metadata,
    Column('announcement_id', ForeignKey('announcements.id'), primary_key=True),
    Column('category_id', ForeignKey('categories.id'), primary_key=True),
)


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
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), unique=True)
    verification_code: Mapped[str] = mapped_column(String(6), unique=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())


@table_registry.mapped_as_dataclass
class Category:
    __tablename__ = 'categories'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)
    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())

    announcements: Mapped[List['Announcement']] = relationship(
        secondary=announcement_category, back_populates='categories', init=False
    )


@table_registry.mapped_as_dataclass
class Announcement:
    __tablename__ = 'announcements'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    title: Mapped[str] = mapped_column(String(150))
    description: Mapped[str] = mapped_column(Text)
    price: Mapped[float]
    location: Mapped[str] = mapped_column(String(150))

    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    categories: Mapped[List['Category']] = relationship(
        secondary=announcement_category, back_populates='announcements'
    )
    is_sold: Mapped[bool] = mapped_column(Boolean, default=False)

    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        init=False, server_default=func.now(), onupdate=func.now()
    )

    user: Mapped['User'] = relationship(backref='announcements', init=False)


@table_registry.mapped_as_dataclass
class Photo:
    __tablename__ = 'photos'

    id: Mapped[int] = mapped_column(init=False, primary_key=True)
    announcement_id: Mapped[int] = mapped_column(ForeignKey('announcements.id'))
    public_id: Mapped[str] = mapped_column(String(255))
    secure_url: Mapped[str] = mapped_column(String(255))

    created_at: Mapped[datetime] = mapped_column(init=False, server_default=func.now())

    announcement: Mapped['Announcement'] = relationship(backref='photos', init=False)
