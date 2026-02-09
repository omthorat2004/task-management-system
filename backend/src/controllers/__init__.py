from .auth_controller import router as auth_router
from .user_controller import router as user_router
from .task_controller import router as task_controller
routers = [
    auth_router,
    user_router,
    task_controller
]