from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from src.models.user import User

class UserDAO:

    @staticmethod
    async def create_user(db: AsyncSession, user: User):
        """Add new user to database and commit"""
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user

    @staticmethod
    async def get_user_by_email(db: AsyncSession, email: str):
        """Fetch user by email"""
        result = await db.execute(select(User).where(User.email == email))
        return result.scalars().first()
