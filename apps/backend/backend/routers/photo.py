from typing import Annotated, List

import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import Announcement, Photo, User
from backend.schema.announcement_schemas import PhotoOut
from backend.security import get_current_user
from backend.settings import Settings

settings = Settings()
router = APIRouter(prefix='/photo', tags=['photo'])
T_Session = Annotated[Session, Depends(get_session)]
T_User = Annotated[User, Depends(get_current_user)]

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)


@router.post('/upload-image/{announcement_id}', response_model=PhotoOut)
def upload_image(
    announcement_id: int,
    session: T_Session,
    current_user: T_User,
    file: UploadFile = File(...),
):
    announcement = session.scalar(
        select(Announcement).where(Announcement.id == announcement_id)
    )

    if current_user.id != announcement.user_id:
        raise HTTPException(
            status_code=403, detail='You do not have permission to upload images.'
        )

    if not announcement:
        raise HTTPException(status_code=404, detail='Announcement not found')

    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail='The uploaded file is not an image.')

    try:
        result = cloudinary.uploader.upload(file.file, folder='fastapi_images')

        photo = Photo(
            public_id=result['public_id'],
            secure_url=result['secure_url'],
            announcement_id=announcement.id,
        )

        session.add(photo)
        session.commit()
        session.refresh(photo)

        return photo
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error to send file: {str(e)}')


@router.get('/{photo_id}', response_model=PhotoOut)
def get_photo(
    photo_id: int,
    current_user: T_User,
    session: T_Session,
):
    photo = session.scalar(select(Photo).where(Photo.id == photo_id))

    if current_user.id != photo.announcement.user_id:
        raise HTTPException(
            status_code=403, detail='You do not have permission to view this photo.'
        )

    if not photo:
        raise HTTPException(status_code=404, detail='Photo not found')

    return photo


@router.get('/by-announcement/{announcement_id}', response_model=List[PhotoOut])
def get_photos_by_announcement(
    announcement_id: int,
    current_user: T_User,
    session: T_Session,
):
    announcement = session.scalar(
        select(Announcement).where(Announcement.id == announcement_id)
    )

    if current_user.id != announcement.user_id:
        raise HTTPException(
            status_code=403, detail='You do not have permission to view these photos.'
        )

    photos = session.scalars(
        select(Photo).where(Photo.announcement_id == announcement_id)
    ).all()

    return photos


@router.delete('/{photo_id}')
def delete_photo(
    photo_id: int,
    session: T_Session,
    current_user: T_User,
):
    photo = session.scalar(select(Photo).where(Photo.id == photo_id))

    if not photo:
        raise HTTPException(status_code=404, detail='Photo not found')

    if photo.announcement.user_id != current_user.id:
        raise HTTPException(
            status_code=403, detail='You do not have permission to delete this photo'
        )

    try:
        cloudinary.uploader.destroy(photo.public_id)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f'Failed to delete from Cloudinary: {str(e)}'
        )

    session.delete(photo)
    session.commit()

    return {'detail': 'Photo deleted successfully'}
