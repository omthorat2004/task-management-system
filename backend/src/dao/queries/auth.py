# SQL queries as constants (industry pattern)
CREATE_USER_QUERY = """
INSERT INTO users (name, email, password, role)
VALUES ($1, $2, $3, $4)
RETURNING id, name, email, role;
"""

GET_USER_BY_EMAIL_QUERY = """
SELECT id, name, email, role, password
FROM users
WHERE email = $1;
"""

GET_USER_BY_ID_QUERY = """
SELECT id, name, email, role
FROM users
WHERE id = $1
"""