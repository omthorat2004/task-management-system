from sqlalchemy.ext.asyncio import AsyncSession
from src.models.user import User
from backend.src.dao.auth_dao import UserDAO
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:

    @staticmethod
    async def hash_password(password: str):
        """Hash plaintext password"""
        return pwd_context.hash(password)

    @staticmethod
    async def register_user(db: AsyncSession, name: str, email: str, password: str):
        """Register a new user, raise error if email exists"""
        existing_user = await UserDAO.get_user_by_email(db, email)
        if existing_user:
            raise ValueError("Email already registered")

        hashed_password = await AuthService.hash_password(password)
        new_user = User(name=name, email=email, password=hashed_password, role="employee")
        return await UserDAO.create_user(db, new_user)
