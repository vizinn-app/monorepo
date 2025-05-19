from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from backend.settings import Settings
from backend.models import table_registry

print(f"Using database URL: {Settings().DATABASE_URL_}")
engine = create_engine(Settings().DATABASE_URL_)

# Create all tables if they don't exist
table_registry.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
