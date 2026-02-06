import asyncpg
from src.schemas.user import UserCreate, UserResponse
from src.dao.queries.auth import CREATE_USER_QUERY, GET_USER_BY_EMAIL_QUERY


class UserDAO:

    @staticmethod
    async def create_user(connection: asyncpg.Connection, user: UserCreate) -> dict:
        """Add new user to the database and return created user"""
        row = await connection.fetchrow(
            CREATE_USER_QUERY,
            user.name,
            user.email,
            user.password,
            "employee"
        )
        return dict(row)

    @staticmethod
    async def get_user_by_email(connection: asyncpg.Connection, email: str) -> dict | None:
        """Fetch user by email"""
        row = await connection.fetchrow(GET_USER_BY_EMAIL_QUERY, email)
        if row:
            return dict(row)
        return None
