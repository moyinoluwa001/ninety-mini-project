# Express.js PostgreSQL CRUD API

This is a simple RESTful API built with Express.js and PostgreSQL that allows you to perform basic CRUD (Create, Read, Update, Delete) operations on a `users` table.

## Features

- **Create** a new user
- **Read** all users
- **Update** a user by ID
- **Delete** a user by ID

## Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Setup

1. **Clone the repository** (if applicable) or copy the code to your project directory.

2. **Install dependencies:**
   ```bash
   npm install express body-parser pg
   ```

3. **Configure PostgreSQL:**
   - Create a database named `mydb` (or change the name in the code).
   - Create a `users` table:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100)
     );
     ```
   - Update the PostgreSQL credentials in `index.js`:
     ```js
     const pool = new Pool({
       user: 'your_pg_username',
       host: 'localhost',
       database: 'mydb',
       password: 'your_pg_password',
       port: 5432,
     });
     ```

4. **Run the server:**
   ```bash
   node index.js
   ```

5. **API Endpoints:**

   - `POST /users`  
     Create a new user.  
     **Body:** `{ "name": "John", "email": "john@example.com" }`

   - `GET /users`  
     Get all users.

   - `PUT /users/:id`  
     Update a user by ID.  
     **Body:** `{ "name": "Jane", "email": "jane@example.com" }`

   - `DELETE /users/:id`  
     Delete a user by ID.

## Example Request (using curl)

```bash
# Create a user
curl -X POST -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com"}' http://localhost:3000/users

# Get all users
curl http://localhost:3000/users

# Update a user
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Bob","email":"bob@example.com"}' http://localhost:3000/users/1

# Delete a user
curl -X DELETE http://localhost:3000/users/1
```

