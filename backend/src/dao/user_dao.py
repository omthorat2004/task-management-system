import asyncpg
from src.dao.queries.user import GET_ALL_USERS
from src.schemas.user import UserResponse


class UserDAO:
    @staticmethod
    async def select_all_users(connection:asyncpg.Connection)->list[UserResponse]:
        users = await connection.fetch(GET_ALL_USERS,'employee')
        
        return [UserResponse(**dict(row)) for row in users]
    
