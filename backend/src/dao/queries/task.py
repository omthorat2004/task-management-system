CREATE_TASK = """
INSERT INTO tasks (title, description, assigned_user, status, due_date)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
"""

FETCH_ALL_TASKS = """
SELECT * FROM tasks ORDER BY created_at DESC;
"""

ADMIN_UPDATE_TASK = """
UPDATE tasks
SET
  title = $1,
  description = $2,
  assigned_user = $3,
  status = $4,
  due_date = $5
WHERE id = $6
RETURNING *;
"""

EMPLOYEE_UPDATE_STATUS = """
UPDATE tasks
SET status = $1
WHERE id = $2
RETURNING *;
"""
