# DevPortfolio Backend (Vercel-ready)

This backend is a stateless REST API for:
- Public portfolio site: fetches **published** content only
- Admin dashboard: full CRUD + publish/unpublish via JWT-protected routes
- Contact form: stores messages + sends admin email notification

## Local setup
1. `cd backend`
2. `npm install`
3. Create `.env` from `.env.example` and fill:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - SMTP settings (for emails)
   - `ADMIN_EMAIL` + `ADMIN_PASSWORD` (bootstraps the single admin on first run)
4. Run: `npm run dev`

Server runs on `http://localhost:4000` by default.

## Deploy to Vercel
- Create a Vercel project and set **Root Directory** = `backend`
- Add all env vars from `.env.example` in Vercel Project Settings
- Deploy

`vercel.json` routes all requests to a single serverless function (`api/index.js`) that runs Express.

## API summary
Auth:
- POST `/api/auth/login`
- GET  `/api/auth/me`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`

Admin (JWT protected):
- `/api/admin/home`
- `/api/admin/about`
- `/api/admin/skills`
- `/api/admin/projects`
- `/api/admin/experience`
- `/api/admin/messages`

Public:
- `/api/public/home`
- `/api/public/about`
- `/api/public/skills`
- `/api/public/projects`
- `/api/public/experience`
- POST `/api/public/messages` (alias: POST `/api/public/contact`)

## Quick curl smoke tests
Login:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"change_me_now"}'
```

Public (once you have published data):
```bash
curl http://localhost:4000/api/public/projects
```
