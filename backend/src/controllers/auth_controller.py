from fastapi import APIRouter, Depends, HTTPException, status

from src.core.database import get_db
from src.core.jwt import create_access_token
from src.schemas.user import SignupResponse, UserCreate, UserResponse
from src.services.auth_service import AuthService

import asyncpg

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post(
    "/signup",
    response_model=SignupResponse,
    status_code=status.HTTP_201_CREATED 
)
async def register(user: UserCreate, db: asyncpg.Connection = Depends(get_db)):
    """
    Register a new user (employee only) and return JWT token
    """
    try:

        new_user = await AuthService.register_user(db, user.name, user.email, user.password)

        # Generate JWT token
        token = create_access_token({"user_id": new_user["id"], "role": new_user["role"]})

        
        return SignupResponse(
    user=new_user,
    access_token=token,
    token_type="bearer"
)


    except ValueError as e:
        # Email already exists
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )
