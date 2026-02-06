from fastapi import APIRouter, Depends, status, HTTPException
import asyncpg

from src.core.database import get_db
from src.core.jwt import create_access_token
from src.schemas.user import UserCreate, SignupResponse, UserLogin, LoginResponse
from src.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=SignupResponse, status_code=status.HTTP_201_CREATED)
async def signup(user: UserCreate, db: asyncpg.Connection = Depends(get_db)):
    """
    Register a new user and return JWT token
    """
    created_user = await AuthService.register_user(db, user)
    print(created_user)

    token = create_access_token({"user_id": created_user.id, "role": created_user.role})

    return SignupResponse(user=created_user, access_token=token)


@router.post("/login", response_model=LoginResponse)
async def login(user: UserLogin, db: asyncpg.Connection = Depends(get_db)):
    """
    Login user and return JWT token
    """
    
    print(user)
    logged_in_user = await AuthService.login_user(db, user.email, user.password)

    token = create_access_token({"user_id": logged_in_user.id, "role": logged_in_user.role})

    return LoginResponse(user=logged_in_user, access_token=token)
