from fastapi import APIRouter, Depends, status
import asyncpg

from src.core.database import get_db
from src.core.jwt import verify_token
from src.schemas.task import (
    TaskCreate,
    TaskAdminUpdate,
    TaskEmployeeStatusUpdate,
    TaskResponse,
)
from src.services.task_service import TaskService

router = APIRouter(prefix="/task", tags=["Tasks"])


@router.post("/create", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    data: TaskCreate,
    db: asyncpg.Connection = Depends(get_db),
    token_data: dict = Depends(verify_token),
):
    return await TaskService.create_task(db, data)


@router.get("/all", response_model=list[TaskResponse])
async def get_all_tasks(
    db: asyncpg.Connection = Depends(get_db),
):
    return await TaskService.get_all_tasks(db)


@router.put("/admin/update/{task_id}", response_model=TaskResponse)
async def admin_update_task(
    task_id: int,
    data: TaskAdminUpdate,
    db: asyncpg.Connection = Depends(get_db),
    token_data: dict = Depends(verify_token),
):
    return await TaskService.admin_update_task(
        db,
        token_data["role"],
        task_id,
        data,
    )


@router.put("/employee/update-status/{task_id}", response_model=TaskResponse)
async def employee_update_status(
    task_id: int,
    data: TaskEmployeeStatusUpdate,
    db: asyncpg.Connection = Depends(get_db),
    token_data: dict = Depends(verify_token),
):
    return await TaskService.employee_update_status(
        db,
        token_data["role"],
        task_id,
        data.status,
    )
