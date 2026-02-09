from typing import List

import asyncpg
from fastapi import APIRouter, Depends, status
from src.core.database import get_db
from src.schemas.user import UserResponse
from src.services.user_service import UserService

router = APIRouter(prefix="/admin",tags=["Admin"])

@router.get("/users",response_model=List[UserResponse],status_code=status.HTTP_200_OK)
async def get_all_users(db:asyncpg.Connection=Depends(get_db))->List[UserResponse]:
    users = await UserService.get_all_users(db)
    
    return users
    
    