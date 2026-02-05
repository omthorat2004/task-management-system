

import asyncpg

from src.schemas.user import UserCreate
from src.dao.queries.auth import CREATE_USER_QUERY,GET_USER_BY_EMAIL_QUERY


class UserDAO:

    @staticmethod
    async def create_user(connection: asyncpg.Connection, user: UserCreate, role: str = "employee"):
        """
        Add new user to the database using raw SQL.
        Returns the created user as a dict.
        """
        row = await connection.fetchrow(
            CREATE_USER_QUERY,
            user.name,
            user.email,
            user.password,
            role
        )

        return dict(row)

    @staticmethod
    async def get_user_by_email(connection: asyncpg.Connection, email: str):
        """
        Fetch a user by email using raw SQL.
        Returns the user as a dict or None.
        """
        row = await connection.fetchrow(GET_USER_BY_EMAIL_QUERY, email)
        if row:
            return dict(row)
        return None
