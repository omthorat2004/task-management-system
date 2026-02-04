from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.schemas.user import UserCreate, UserResponse
from src.services.auth_service import AuthService
from src.core.database import get_db
from src.core.jwt import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post(
    "/register",
    response_model=dict,
    status_code=status.HTTP_201_CREATED  # 201 Created for successful signup
)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Register a new user (employee only) and return JWT token
    """
    try:
        # Create new user
        new_user = await AuthService.register_user(db, user.name, user.email, user.password)

        # Generate JWT token
        token = create_access_token({"user_id": new_user.id, "role": new_user.role})

        # Return user info + token
        return {
            "user": UserResponse.model_validate(new_user).model_dump(),
            "access_token": token,
            "token_type": "bearer"
        }

    except ValueError as e:
        # Email already exists
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )
