from pydantic import BaseModel, EmailStr, constr


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
