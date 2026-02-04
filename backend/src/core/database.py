from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# PostgreSQL async URL
DATABASE_URL = "postgresql+asyncpg://omthorat:pass@localhost:5432/task-management-system"

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True  # prints SQL queries in console
)

# Session maker
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base for models
Base = declarative_base()

# Dependency for FastAPI
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
