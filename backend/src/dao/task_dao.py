from asyncpg import Connection
from .queries.task import (
    CREATE_TASK,
    FETCH_ALL_TASKS,
    ADMIN_UPDATE_TASK,
    EMPLOYEE_UPDATE_STATUS,
)


class TaskDAO:

    @staticmethod
    async def create(db: Connection, data):
        return await db.fetchrow(
            CREATE_TASK,
            data.title,
            data.description,
            data.assigned_user,
            data.status,
            data.due_date,
        )

    @staticmethod
    async def fetch_all(db: Connection):
         records = await db.fetch(FETCH_ALL_TASKS)
         return [dict(r) for r in records]

    @staticmethod
    async def admin_update(db: Connection, task_id: int, data):
        return await db.fetchrow(
            ADMIN_UPDATE_TASK,
            data.title,
            data.description,
            data.assigned_user,
            data.status,
            data.due_date,
            task_id,
        )

    @staticmethod
    async def employee_update_status(db: Connection, task_id: int, status: str):
        return await db.fetchrow(
            EMPLOYEE_UPDATE_STATUS,
            status,
            task_id,
        )
