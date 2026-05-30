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
cd backend
cp .env.example .env   # if .env does not exist
npm install
npm run seed           # demo users + sample data (required before first login)
npm run dev
```

**Login returns 500?** Usually MongoDB is not running or the DB was never seeded. Run `npm run seed` in `backend/` and confirm `http://localhost:5001/api/health` shows `"database": "connected"`.

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
  routes/index.tsx           # Sub-routes controller
  modules/                   # Role-based modules (admin, teacher, student)
    admin/                   # Admin pages, layouts, sub-routes, services, voice panels
    teacher/                 # Faculty pages, layouts, sub-routes, services
    student/                 # Student pages, layouts, sub-routes, services
  shared/                    # Shared components, services, and layouts
  pages/auth/                # Login, signup, forgot password
backend/
  modules/                   # Admin, Teacher, Student, Auth, Events, Notifications, Voice-Agent, Analytics
```

## Environment

**Frontend** (optional): `VITE_API_URL` — defaults to `/api` via Vite proxy. If set to a full origin (e.g. `http://localhost:5001`), `/api` is appended automatically.

**Backend** (`backend/.env`): `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`.
