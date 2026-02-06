import asyncpg
from passlib.context import CryptContext
from fastapi import HTTPException, status
from src.dao.auth_dao import UserDAO
from src.schemas.user import UserCreate, UserResponse

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:

    @staticmethod
    async def hash_password(password: str) -> str:
        """Hash plaintext password"""
        return pwd_context.hash(password)

    @staticmethod
    async def check_password(hashed_password: str, plain_password: str) -> bool:
        """Check if the plain password matches the hashed password"""
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    async def register_user(db: asyncpg.Connection, user: UserCreate) -> UserResponse:
        """Register a new user, raise HTTPException if email exists"""
        existing_user = await UserDAO.get_user_by_email(db, user.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )

        hashed_password = await AuthService.hash_password(user.password)

        created_user = await UserDAO.create_user(
            db,
            UserCreate(
                name=user.name,
                email=user.email,
                password=hashed_password
            )
        )

        return UserResponse(**created_user)

    @staticmethod
    async def login_user(db: asyncpg.Connection, email: str, password: str) -> UserResponse:
        """Login user, raise HTTPException if not found or invalid password"""
        user = await UserDAO.get_user_by_email(db, email)
        
        if  user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        if not await AuthService.check_password(user["password"], password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        return UserResponse(**user)
    @staticmethod
    async def verify_user(
        db: asyncpg.Connection,
        user_id: int
        ) -> UserResponse:
        user = await UserDAO.get_user_by_id(db, user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )

        return UserResponse(**user)

        
