# Deltone Solutions - Task Manager

A full-stack task management app with JWT-based authentication, password reset flow, and a modern React dashboard.

This project includes:
- `frontend/`: React + Vite client
- `backend/TaskManager.API/`: ASP.NET Core Web API + EF Core + MySQL

## Features

- User registration and login
- JWT authentication
- Forgot password + reset password with token
- Protected dashboard route
- Create, delete, and toggle tasks
- Task separation in dashboard:
  - Not Completed
  - Completed

## Tech Stack

Frontend:
- React 19
- React Router
- Axios
- Vite

Backend:
- ASP.NET Core 8 Web API
- Entity Framework Core 8
- Pomelo MySQL provider
- JWT Bearer authentication
- BCrypt password hashing
- Swagger (OpenAPI)

Database:
- MySQL

## Project Structure

```text
Deltone Solutions/
|- backend/
|  `- TaskManager.API/
|     |- Controllers/
|     |- Services/
|     |- Repositories/
|     |- Data/
|     |- Models/
|     |- DTOs/
|     `- Program.cs
|- frontend/
|  |- src/
|  |  |- pages/
|  |  |- components/
|  |  |- services/
|  |  |- api/
|  |  `- context/
|  `- package.json
`- README.md
```

## Prerequisites

- .NET SDK 8.0+
- Node.js 18+
- MySQL Server

## Backend Setup (API)

1. Go to the backend project:

```bash
cd backend/TaskManager.API
```

2. Update `appsettings.json`:
- `ConnectionStrings:DefaultConnection`
- `Jwt:Key`, `Jwt:Issuer`, `Jwt:Audience`

3. Apply migrations:

```bash
dotnet ef database update
```

If `dotnet ef` is not installed:

```bash
dotnet tool install --global dotnet-ef
```

4. Run the API:

```bash
dotnet run
```

Default local URLs from launch settings:
- `http://localhost:5127`
- `https://localhost:7070`

Swagger:
- `http://localhost:5127/swagger`
- `https://localhost:7070/swagger`

## Frontend Setup (Client)

1. Go to frontend:

```bash
cd frontend
```

2. Install packages:

```bash
npm install
```

3. Configure API base URL (optional but recommended):

Create `.env` in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:5127/api
```

4. Run frontend:

```bash
npm run dev
```

Vite default URL:
- `http://localhost:5173`

## API Endpoints

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password?email=...`
- `POST /api/auth/reset-password`

Tasks (JWT required):
- `GET /api/tasks`
- `GET /api/tasks/{id}`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`
- `PATCH /api/tasks/{id}/toggle`

## Environment and Security Notes

- Do not commit real DB passwords or production JWT secrets.
- Move sensitive values to environment variables for production.
- Keep `appsettings.Development.json` for local-only values.

## Useful Commands

Backend:

```bash
cd backend/TaskManager.API
dotnet build
dotnet run
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Current App Routes

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/` (protected dashboard)

## Notes

- The frontend stores JWT in `localStorage` and sends it as `Authorization: Bearer <token>`.
- Dashboard displays tasks in two columns and moves tasks between them when toggled.
