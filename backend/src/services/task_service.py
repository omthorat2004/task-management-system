from fastapi import HTTPException, status
from asyncpg import Connection
from src.dao.task_dao import TaskDAO


class TaskService:

    @staticmethod
    async def create_task(db: Connection, data):
        return await TaskDAO.create(db, data)

    @staticmethod
    async def get_all_tasks(db: Connection):
        return await TaskDAO.fetch_all(db)

    @staticmethod
    async def admin_update_task(db: Connection, user_role: str, task_id: int, data):
        if user_role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only admin can edit full task",
            )

        task = await TaskDAO.admin_update(db, task_id, data)

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        return task

    @staticmethod
    async def employee_update_status(db: Connection, user_role: str, task_id: int, status: str):
        if user_role != "employee":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only employee can update task status",
            )

        task = await TaskDAO.employee_update_status(db, task_id, status)

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        return task
