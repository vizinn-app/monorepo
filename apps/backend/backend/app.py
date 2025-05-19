from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from starlette.requests import Request

from backend.routers import announcement, auth, category, photo, users

app = FastAPI()

# Add CORS middleware to allow requests from any frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Adicionar um handler específico para requisições OPTIONS para garantir CORS
@app.options("/{rest_of_path:path}")
async def options_route(request: Request):
    response = JSONResponse(content={"message": "OK"})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(category.router)
app.include_router(announcement.router)
app.include_router(photo.router)


@app.get('/')
def read_root():
    return {'message': 'Olá Mundo!'}
