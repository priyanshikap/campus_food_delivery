# CampusBite

CampusBite is a live campus food-ordering platform with student ordering, staff operations, inventory reservations, and admin management.

## Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Recharts
- Backend: Node.js, Express, PostgreSQL, JWT, bcryptjs
- Database: PostgreSQL 14+

## Local setup

### 1. Create the database

Create a PostgreSQL database named `campusbite`, then configure the backend environment:

```powershell
cd backend
Copy-Item .env.example .env
```

Edit `.env` with your local PostgreSQL password. Never commit `.env`.

### 2. Install and seed the backend

```powershell
npm install
npm run db:setup
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

For a deployed frontend, set `VITE_API_BASE_URL` to the deployed backend API URL before building.

## Demo accounts

All demo accounts use `password123` locally:

| Role | Email |
| --- | --- |
| Student | `student@campusbite.com` |
| Staff | `staff@campusbite.com` |
| Admin | `admin@campusbite.com` |

Change these credentials before using a shared or production database.

## Role capabilities

- Students browse live menu availability, reserve pickup slots, place orders, track status, and cancel within 30 seconds after staff confirmation.
- Staff confirm, reject, prepare, ready, and collect orders; manage menu items, pickup slots, and inventory.
- Admins manage users, analytics, and menu items.

## Important business rules

- Orders reserve inventory inside a PostgreSQL transaction.
- Rejected and cancelled orders release their reserved inventory.
- Staff confirmation records `confirmed_at` on the server.
- Cancellation is accepted only while the order is `CONFIRMED` and within 30 seconds of confirmation.
- The payment screen is demo-only and does not charge a real card.

## Validation

```powershell
cd frontend
npm run build
```

Backend syntax can be checked with:

```powershell
cd backend
node --check src/server.js
```

## Deployment checklist

- Use a managed PostgreSQL database and run the schema/seed process once.
- Set a strong `JWT_SECRET`, `DATABASE_URL`, and `PORT` in the hosting environment.
- Set frontend `VITE_API_BASE_URL` to the public backend URL.
- Configure CORS for the deployed frontend origin.
- Do not commit `.env`, database credentials, `node_modules`, or build output.
