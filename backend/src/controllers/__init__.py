from .auth_controller import router as auth_router
from .user_controller import router as user_router
routers = [
    auth_router,
    user_router
]