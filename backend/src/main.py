from fastapi import FastAPI
from src.core.database import Base, engine
from src.controllers import routers

app = FastAPI(title="Task Management System")

# Include routers
for router in routers:
    app.include_router(router)

# Startup event to create tables if they don’t exist
@app.on_event("startup")
async def on_startup():
    # Only for development/testing
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
