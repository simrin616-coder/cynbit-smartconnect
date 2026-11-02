# Cynbit SmartConnect

A full-stack assessment prototype proposing a more interactive project-discovery and inquiry experience.

> This is an independent prototype inspired by the assessment brief. It is not the official Cynbit website and is not affiliated with Cynbit Technologies.

## Features

- Responsive landing page and service cards
- Smart Project Planner with selectable requirements
- Project inquiry form
- Express REST API and MongoDB persistence
- Admin-protected inquiry listing and status update endpoints

## Technology

React, Vite, CSS, Node.js, Express, MongoDB, Mongoose, Axios.

## Run locally

### 1. Requirements
Install Node.js (LTS) and create a MongoDB database using MongoDB Atlas or a local MongoDB server.

### 2. Start backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and fill in your MongoDB connection string and a strong admin key.

```bash
npm run dev
```
Backend: `http://localhost:5000`

### 3. Start frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Frontend: `http://localhost:5173`

If your backend is deployed elsewhere, create `client/.env`:
```env
VITE_API_URL=https://YOUR-BACKEND-URL
```
Restart the Vite development server after changing environment variables.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API health check |
| POST | `/api/inquiries` | Create inquiry |
| GET | `/api/inquiries` | List inquiries (requires `x-admin-key`) |
| PATCH | `/api/inquiries/:id/status` | Update status (requires `x-admin-key`) |

For protected endpoints, send the `x-admin-key` header with the value of `ADMIN_KEY` from the backend environment.

## Deployment overview

- Frontend: deploy the `client` folder to Vercel. Set `VITE_API_URL` to your deployed backend URL.
- Backend: deploy the `server` folder to Render. Add `MONGODB_URI`, `ADMIN_KEY`, `CLIENT_URL` and `PORT` environment variables. Set `CLIENT_URL` to your deployed frontend origin.
- Database: use MongoDB Atlas and allow network access from your backend host according to your deployment provider's current instructions.

## Before submission

- Replace placeholder branding/content with your own clearly described prototype identity.
- Test the form and API using your own database.
- Do not commit `.env` or secrets to GitHub.
- Add screenshots and your own analysis of the existing website to the technical report.
- Use small, meaningful Git commits.
