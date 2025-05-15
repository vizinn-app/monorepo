from datetime import datetime
from typing import List

from pydantic import BaseModel


class PhotoBase(BaseModel):
    public_id: str
    secure_url: str
    announcement_id: int


class PhotoOut(BaseModel):
    id: int
    public_id: str
    secure_url: str


class AnnouncementBase(BaseModel):
    title: str
    description: str
    price: float
    location: str
    category_id: int


class AnnouncementCreate(AnnouncementBase):
    category_id: List[int]


class CategoryOut_(BaseModel):
    id: int
    name: str


class AnnouncementOut(BaseModel):
    id: int
    title: str
    description: str
    price: float
    location: str
    is_sold: bool
    created_at: datetime
    updated_at: datetime
    categories: List[CategoryOut_] = []
    photos: List[PhotoOut] = []


# class AnnouncementOut(AnnouncementBase):
#     id: int
#     user_id: int
#     is_sold: bool
#     created_at: datetime
#     updated_at: datetime

#     category: Optional[CategoryOut] = None
#     #photos: List[PhotoOut] = []
