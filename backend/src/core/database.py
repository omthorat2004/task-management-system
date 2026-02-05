import asyncpg
from fastapi import Depends

DATABASE_URL = "postgresql://omthorat:password@localhost:5432/task_management_system"

class Database:
    pool: asyncpg.Pool | None = None

db = Database()

async def connect_db():
    db.pool = await asyncpg.create_pool(
        DATABASE_URL,
        min_size=1,
        max_size=10
    )

async def disconnect_db():
    await db.pool.close()

async def get_db():
    async with db.pool.acquire() as connection:
        yield connection
