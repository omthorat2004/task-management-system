class UserRole:
    ADMIN = "admin"
    EMPLOYEE = "employee"

class TaskStatus:
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"


JWT_SECRET = "SECRET"  
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120