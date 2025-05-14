from http import HTTPStatus
from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import Announcement, Category, User
from backend.schema.announcement_schemas import AnnouncementCreate, AnnouncementOut
from backend.security import get_current_user

router = APIRouter(prefix='/announcement', tags=['announcement'])
T_Session = Annotated[Session, Depends(get_session)]
T_User = Annotated[User, Depends(get_current_user)]


@router.post('/', response_model=AnnouncementOut)
def create_announcement(
    data: AnnouncementCreate, session: T_Session, current_user: T_User
):
    categories = session.scalars(
        select(Category).where(Category.id.in_(data.category_id))
    ).all()

    if len(categories) != len(data.category_id):
        raise HTTPException(
            status_code=HTTPStatus.BAD_REQUEST,
            detail='One or more categories were not found.',
        )

    announcement = Announcement(
        title=data.title,
        description=data.description,
        price=data.price,
        location=data.location,
        user_id=current_user.id,
        categories=categories,
    )

    session.add(announcement)
    session.commit()
    session.refresh(announcement)

    return announcement


@router.get('/', response_model=List[AnnouncementOut])
def list_announcements(session: T_Session):
    announcements = session.scalars(select(Announcement)).all()
    return announcements


@router.get('/{announcement_id}', response_model=AnnouncementOut)
def get_announcement(announcement_id: int, session: T_Session, current_user: T_User):
    announcement = session.get(Announcement, announcement_id)
    if not announcement:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Announcement not found.'
        )

    if announcement.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN, detail='Not enough permissions.'
        )
    return announcement


@router.delete('/{announcement_id}', status_code=HTTPStatus.NO_CONTENT)
def delete_announcement(announcement_id: int, session: T_Session, current_user: T_User):
    announcement = session.get(Announcement, announcement_id)

    if not announcement:
        raise HTTPException(
            status_code=HTTPStatus.NOT_FOUND, detail='Announcement not found.'
        )
    if announcement.user_id != current_user.id:
        raise HTTPException(
            status_code=HTTPStatus.FORBIDDEN, detail='Not enough permissions.'
        )

    session.delete(announcement)
    session.commit()
    return {'detail': 'Anúncio excluído com sucesso.'}
