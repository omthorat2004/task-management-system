import asyncpg
from typing import Optional
from src.dao.queries.auth import (
    CREATE_USER_QUERY,
    GET_USER_BY_EMAIL_QUERY,
    GET_USER_BY_ID_QUERY,
)
from src.schemas.user import UserCreate
from src.schemas.user import UserDB

class UserDAO:

    @staticmethod
    async def create_user(
        connection: asyncpg.Connection,
        user: UserCreate,
        role: str = "employee"
    ) -> UserDB:
        row = await connection.fetchrow(
            CREATE_USER_QUERY,
            user.name,
            user.email,
            user.password,
            role
        )

        return UserDB(**dict(row))

    @staticmethod
    async def get_user_by_email(
        connection: asyncpg.Connection,
        email: str
    ) -> Optional[UserDB]:
        row = await connection.fetchrow(GET_USER_BY_EMAIL_QUERY, email)

        if row is None:
            return None

        return UserDB(**dict(row))

    @staticmethod
    async def get_user_by_id(
        connection: asyncpg.Connection,
        user_id: int
    ) -> Optional[UserDB]:
        row = await connection.fetchrow(GET_USER_BY_ID_QUERY, user_id)

        if row is None:
            return None

        return UserDB(**dict(row))
