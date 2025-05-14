from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from backend.settings import Settings
print(repr(Settings().DATABASE_URL_))
engine = create_engine(Settings().DATABASE_URL_)



def get_session():
    with Session(engine) as session:
        yield session
