# SafetyHub — Construction Site Safety Compliance Platform

SafetyHub is a full-stack web application that replaces paper-based construction safety reporting with digital incident reporting, inspections, compliance tracking, notifications and administrative oversight.

## Features

- JWT authentication with `admin`, `site_manager`, and `safety_officer` roles
- Hazard, accident and near-miss reporting with severity, category, site and image attachment fields
- Safety checklist creation and site inspection workflow
- Compliance dashboard: reports, resolution rate, unresolved issues, inspection pass rate and incident trend chart
- In-app notifications for critical reports, inspections and status changes
- Admin user and construction-site management
- Responsive React/Tailwind interface and protected routes

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, Tailwind CSS, Recharts |
| Backend | Node.js, Express, JWT, bcrypt, Zod, Multer |
| Database | PostgreSQL with Prisma ORM |
| Media | Cloudinary (optional image storage) |
| Deployment | Vercel frontend, Render backend, Neon PostgreSQL |

## Project structure

```text
frontend/       React client
backend/        Express REST API and Prisma schema
backend/prisma/ Database migration and realistic seed data
render.yaml     Free Render web-service configuration
```

## Local installation

1. Copy `backend/.env.example` to `backend/.env` and add a PostgreSQL/Neon `DATABASE_URL` and `JWT_SECRET`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. Run:

```bash
npm install
npm run install:all
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run seed
cd ..
npm run dev
```

Frontend runs at `http://localhost:5173`; API health check: `http://localhost:5000/api/health`.

## Demo accounts

Run `npm run seed` against the same database used by the application before using these accounts.

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@safetyhub.test` | `Safety@123` |
| Site manager | `manager@safetyhub.test` | `Safety@123` |
| Safety officer | `officer@safetyhub.test` | `Safety@123` |

> If deployed login fails, the deployed Neon database has not been seeded. In the `backend` directory, set the production `DATABASE_URL` locally and run `npm run seed` once. This creates the demo accounts and realistic initial data.

## API summary

| Area | Endpoints |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Sites | `GET/POST /api/sites`, `PUT/DELETE /api/sites/:id` |
| Reports | `GET/POST /api/incidents`, `PATCH /api/incidents/:id/status` |
| Inspections | `GET/POST /api/inspections`, `GET/POST /api/inspections/templates` |
| Dashboard | `GET /api/dashboard` |
| Notifications | `GET /api/notifications`, `PATCH /api/notifications/:id/read` |
| Administration | `GET/POST /api/admin/users`, `PUT/DELETE /api/admin/users/:id` |

## Deployment

1. Create a free Neon PostgreSQL database and copy its connection string.
2. Deploy `backend` as a **Free Render Web Service**. Add `DATABASE_URL`, `JWT_SECRET`, and `NODE_ENV=production`.
3. Set Vercel root directory to `frontend`; add `VITE_API_URL=https://YOUR-RENDER-URL/api` for Production and Preview.
4. After Vercel deploys, add `FRONTEND_URL=https://YOUR-VERCEL-URL` to Render.
5. Seed the Neon database once using the command above, then log in with the demo accounts.

## Notes

Free Render services sleep after inactivity and may take approximately a minute to restart. Cloudinary and SMTP values are optional for local testing; in-app notifications remain available without SMTP.
