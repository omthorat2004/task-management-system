from typing import TypedDict
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str


class SignupResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"
    
class VerifyResponse(BaseModel):
    user: UserResponse
    authenticated: bool
    

class UserDB(TypedDict):
    id: int
    name: str
    email: str
    role: str