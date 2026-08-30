# SafetyHub — Construction Site Safety Compliance Platform

A production-oriented MERN-style (React, Express, PostgreSQL) platform for reporting construction safety issues, running audits and monitoring compliance.

## Stack

- React + Vite, React Router, Axios, Tailwind CSS and Recharts
- Node.js + Express, Prisma/PostgreSQL, JWT, bcrypt, Zod, Multer, Cloudinary
- In-app notification persistence and Nodemailer SMTP delivery

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL`, `JWT_SECRET`, and optionally Cloudinary/SMTP credentials. Copy `frontend/.env.example` to `frontend/.env`.
2. Run `npm install`, then `npm run install:all` from the repository root.
3. Create the PostgreSQL database, then run `npm --prefix backend run prisma:migrate` and `npm --prefix backend run seed`.
4. Run `npm run dev`. Frontend: `http://localhost:5173`; API: `http://localhost:5000/api`.

Seeded accounts all use `Safety@123`: `admin@safetyhub.test`, `manager@safetyhub.test`, and `officer@safetyhub.test`.

## API

| Group | Routes |
| --- | --- |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Sites | `GET/POST /api/sites`, `PUT/DELETE /api/sites/:id` |
| Incidents | `GET/POST /api/incidents`, `PATCH /api/incidents/:id/status` |
| Inspections | `GET/POST /api/inspections`, `GET/POST /api/inspections/templates` |
| Dashboard | `GET /api/dashboard` |
| Notifications | `GET /api/notifications`, `PATCH /api/notifications/:id/read`, `PATCH /api/notifications/read-all` |
| Admin | `GET/POST /api/admin/users`, `PUT/DELETE /api/admin/users/:id` |

## Architecture

`backend/src/routes` exposes REST resources; auth and role middleware secure them; `lib/notify.js` persists notifications and optionally sends email. Prisma models preserve relational audit links. `frontend/src/pages.jsx` holds the routed role-aware interface and calls the API through the Axios client.

## Deployment

1. Push this repository to GitHub.
2. In Render, create a Blueprint from the repository; it reads `render.yaml`, provisions PostgreSQL and deploys the backend. Add `FRONTEND_URL`, plus Cloudinary and SMTP variables from `backend/.env.example`.
3. Import the repository into Vercel with root directory `frontend`. Set `VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api`; deploy.
4. Update Render `FRONTEND_URL` to the final Vercel URL and redeploy. Verify `/api/health`, registration, image report, notifications and a completed inspection.

## Manual QA checklist

- Register/login as all roles and confirm appropriate navigation/dashboard data.
- Submit a critical incident with a JPEG/PNG/WebP image; verify it appears for manager/admin and produces alerts.
- Update report status; verify reporter notification.
- Create template, run inspection with failures; verify compliance changes and alert.
- Admin creates a user/site; test responsive navigation at mobile width.
- Run `npm test` and `npm --prefix frontend run build` before release.
