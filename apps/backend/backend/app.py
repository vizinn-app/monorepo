from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routers import announcement, auth, category, photo, users

app = FastAPI()

# Add CORS middleware to allow requests from any frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(category.router)
app.include_router(announcement.router)
app.include_router(photo.router)


@app.get('/')
def read_root():
    return {'message': 'Olá Mundo!'}
