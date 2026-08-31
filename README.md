# SafetyHub

### Construction Site Safety Compliance Reporting Platform

[![Source Code](https://img.shields.io/badge/GitHub-Source%20Code-181717?logo=github)](https://github.com/militprakashsahajwani/construction_safety_platform)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)](./frontend)
[![Backend](https://img.shields.io/badge/API-Node.js%20%2B%20Express-339933?logo=node.js)](./backend)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)](./backend/prisma/schema.prisma)

SafetyHub digitises construction-site safety operations. It enables teams to report incidents, complete safety inspections, monitor compliance performance, receive alerts, and administer users and project sites through one responsive web application.

> **Repository:** [militprakashsahajwani/construction_safety_platform](https://github.com/militprakashsahajwani/construction_safety_platform)

## Key capabilities

- Secure JWT authentication with bcrypt password hashing and role-based access control.
- Role-aware workspaces for administrators, site managers, and safety officers.
- Incident reporting for hazards, accidents, and near misses with severity, category, site, status, and optional image evidence.
- Reusable safety checklists and inspection/audit results with pass/fail notes.
- Compliance KPIs for report resolution, unresolved issues, inspection pass rate, and incident trends.
- In-app notifications for critical incidents, inspection findings, and report-status changes.
- Administration screens for users and construction sites.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, Tailwind CSS, Recharts |
| Backend | Node.js, Express.js, REST API, Zod, Multer |
| Security | JWT, bcrypt, Helmet, rate-limited authentication |
| Database | PostgreSQL, Prisma ORM |
| Integrations | Cloudinary image storage and Nodemailer SMTP support |
| Hosting | Vercel frontend, Render backend, Neon PostgreSQL |

## Architecture

```text
React/Vercel client
        │ Axios + JWT
        ▼
Express/Render REST API
        │ Prisma ORM
        ▼
PostgreSQL/Neon database
        │
Cloudinary (optional evidence images) · SMTP (optional email alerts)
```

## Project structure

```text
frontend/                 React application
backend/src/routes/       REST API endpoints
backend/src/middleware/   Authentication and error middleware
backend/prisma/           Schema, migration, and seed data
render.yaml               Free Render deployment configuration
PRD_RECAP.md              Feature-delivery summary
```

## Local setup

### Prerequisites

- Node.js 20 or newer
- A PostgreSQL database (a free Neon database is supported)

### Installation

```bash
git clone https://github.com/militprakashsahajwani/construction_safety_platform.git
cd construction_safety_platform
npm install
npm run install:all
```

Create `backend/.env` from `backend/.env.example` and add `DATABASE_URL` plus a strong `JWT_SECRET`. Create `frontend/.env` from `frontend/.env.example`.

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run seed
cd ..
npm run dev
```

The frontend runs at `http://localhost:5173` and the API health check is available at `http://localhost:5000/api/health`.

## Demo credentials

Run `npm run seed` against the target database first.

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `admin@safetyhub.test` | `Safety@123` |
| Site manager | `manager@safetyhub.test` | `Safety@123` |
| Safety officer | `officer@safetyhub.test` | `Safety@123` |

## API overview

| Resource | Routes |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Sites | `GET/POST /api/sites`, `PUT/DELETE /api/sites/:id` |
| Incident reports | `GET/POST /api/incidents`, `PATCH /api/incidents/:id/status` |
| Inspections | `GET/POST /api/inspections`, `GET/POST /api/inspections/templates` |
| Compliance | `GET /api/dashboard` |
| Notifications | `GET /api/notifications`, `PATCH /api/notifications/:id/read` |
| Administration | `GET/POST /api/admin/users`, `PUT/DELETE /api/admin/users/:id` |

## Live deployment

| Service | URL |
| --- | --- |
| Live application | [construction-safety-platform.vercel.app](https://construction-safety-platform.vercel.app/) |
| REST API | [construction-safety-platform-qlf2.onrender.com](https://construction-safety-platform-qlf2.onrender.com/api/health) |
| Source repository | [GitHub repository](https://github.com/militprakashsahajwani/construction_safety_platform) |

### Production configuration

The deployed frontend communicates with the Render API through `VITE_API_URL`. The Render service uses Neon PostgreSQL through `DATABASE_URL` and requires `JWT_SECRET` to issue secure login tokens. Demo data is created with `npm run seed`.

> Free Render services can take up to a minute to respond after inactivity. This is a free-tier hosting behaviour, not an application error.
