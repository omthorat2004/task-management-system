from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional, Literal


TaskStatus = Literal["pending", "in-progress", "completed"]


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    assigned_user: int
    due_date: date
    status: TaskStatus = "pending"


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    assigned_user: int
    due_date: date
    status: TaskStatus = "pending"  # "pending", "in-progress", "completed"



class TaskAdminUpdate(TaskBase):
    pass


class TaskEmployeeStatusUpdate(BaseModel):
    status: TaskStatus


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    assigned_user: int
    status: TaskStatus
    due_date: date
    created_at: datetime
