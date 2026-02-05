from fastapi import FastAPI
from src.core.database import Base, engine
from src.controllers import routers
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Task Management System")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React (Vite)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
for router in routers:
    app.include_router(router)

# Startup event to create tables if they don’t exist
@app.on_event("startup")
async def on_startup():
    # Only for development/testing
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
