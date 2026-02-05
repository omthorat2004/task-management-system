from fastapi import FastAPI

from src.controllers import routers
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="Task Management System")

from .core.database import connect_db,disconnect_db
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

@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()