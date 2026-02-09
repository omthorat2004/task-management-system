import asyncpg
from src.dao.queries.user import GET_ALL_USERS
from src.schemas.user import UserListResponse


class UserDAO:
    @staticmethod
    async def select_all_users(connection:asyncpg.Connection)->list[UserListResponse]:
        users = await connection.fetch(GET_ALL_USERS,'employee')
        
        return [UserListResponse(**dict(row)) for row in users]
    
