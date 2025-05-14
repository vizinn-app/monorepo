from datetime import datetime

from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str


class CategoryOut(CategoryBase):
    id: int
    name: str
    created_at: datetime
