from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    full_name: str
    cpf: str
    phone: str
    email: EmailStr


class UserPublic(BaseModel):
    id: int
    full_name: str
    cpf: str
    phone: str
    email: EmailStr


class UserDB(UserSchema):
    id: int


class UserList(BaseModel):
    users: list[UserPublic]


class Message(BaseModel):
    message: str


class LoginSchema(BaseModel):
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str


class verifyCodeSchema(BaseModel):
    verification_code: str
