from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_session
from backend.models import Category, User
from backend.schema.category_schemas import CategoryBase, CategoryOut
from backend.security import get_current_user

router = APIRouter(prefix='/category', tags=['category'])
T_Session = Annotated[Session, Depends(get_session)]
T_User = Annotated[User, Depends(get_current_user)]


@router.post('/', response_model=CategoryOut)
def create_category(
    category: CategoryBase,
    session: T_Session,
    current_user: T_User,
):
    db_category = session.query(Category).filter(Category.name == category.name).first()

    if db_category:
        raise HTTPException(status_code=400, detail='Category already exists')

    new_category = Category(**category.dict())
    session.add(new_category)
    session.commit()
    session.refresh(new_category)

    return new_category


@router.get('/', response_model=list[CategoryOut])
def read_categories(
    session: T_Session, current_user: T_User, skip: int = 0, limit: int = 100
):
    categories = session.query(Category).offset(skip).limit(limit).all()
    return categories
