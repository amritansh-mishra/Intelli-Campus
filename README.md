# Intelli Campus

Enterprise university management platform with **role-based access** (Admin, Teacher, Student), JWT authentication, and an **AI Voice Agent** for outbound reminders.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express, MongoDB, JWT, bcrypt |

## Quick start

### 1. MongoDB

Run MongoDB locally (default: `mongodb://127.0.0.1:27017/intelli-campus`).

### 2. API server

```bash
cd server
cp .env.example .env   # if .env does not exist
npm install
npm run seed           # demo users + sample data (required before first login)
npm run dev
```

**Login returns 500?** Usually MongoDB is not running or the DB was never seeded. Run `npm run seed` in `server/` and confirm `http://localhost:5001/api/health` shows `"database": "connected"`.

API: `http://localhost:5001/api` (port **5001** avoids macOS AirPlay on 5000)

### 3. Frontend

```bash
npm install
npm run dev
```

App: `http://localhost:5173` (proxies `/api` → backend)

## Demo accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@campus.edu |admin123  |
| Teacher | teacher@campus.edu | teacher123 |
| Student | student@campus.edu | student123 |

## Routes

| Role | Dashboard |
|------|-----------|
| Admin | `/admin/dashboard` |
| Teacher | `/teacher/dashboard` |
| Student | `/student/dashboard` |

Auth: `/login`, `/signup`, `/forgot-password`

## Project structure

```
src/
  context/AuthContext.tsx    # JWT + persistent session
  components/routing/        # ProtectedRoute, RoleRoute, RequireRole
  components/layout/         # AdminLayout, TeacherLayout, StudentLayout
  features/admin/            # Admin modules
  features/teacher/          # Faculty modules
  features/student/          # Student modules
  features/voice/            # AI Voice Agent panel
  pages/auth/                # Login, signup, forgot password
server/
  src/models/                # User, Department, Event, Notification, VoiceReminder
  src/routes/                # Auth + role APIs
```

## Environment

**Frontend** (optional): `VITE_API_URL` — defaults to `/api` via Vite proxy. If set to a full origin (e.g. `http://localhost:5001`), `/api` is appended automatically.

**Backend** (`server/.env`): `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`.
