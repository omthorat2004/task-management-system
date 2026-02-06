import asyncpg
from src.dao.user_dao import UserDAO

class UserService:
    
    @staticmethod
    async def get_all_users(db:asyncpg.Connection):
        users = await UserDAO.select_all_users(db)
        return users