# Twitter Clone (Fullstack JavaScript)

A simple Twitter-like app built with React (Vite) and Node.js/Express with MongoDB. Users can register, log in, create tweets, like once, search tweets, and admins can manage users and tweets.

## Live Demo
- Frontend: mytwitter-clonee.netlify.app
- Backend API: https://team-aa-twitter-clone.onrender.com

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Atlas)
- Auth: JWT (Bearer tokens)
- Deploy: Netlify (frontend), Render (backend)
- PWA: Manifest + service worker for installability

## Features
- Register and log in
- Create tweets and like once per user
- Search tweets by content
- Admin dashboard:
  - Create users (choose role)
  - Update user roles (user/admin)
  - Delete users (with confirmation)
  - Delete tweets (with confirmation)

## Getting Started (Local)

Prerequisites: Node.js, a MongoDB connection string

1) Backend
- cd backend
- Create .env:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

- Install and run:
```bash
npm install
npm run dev
```
API runs on http://localhost:5000

2) Frontend
- cd frontend
- Create .env (optional if using deployed API):

```env
VITE_API_URL=http://localhost:5000/api
```

- Install and run:
```bash
npm install
npm run dev
```
App runs on http://localhost:5173

## API Base & Key Endpoints
Base URL: `<backend>/api`

- POST /users/register
- POST /users/login
- GET /tweets
- GET /tweets/search?query=TEXT
- POST /tweets (auth)
- POST /tweets/:id/like (auth)
- Admin (auth + admin):
  - GET /users
  - PUT /users/:id
  - DELETE /users/:id
  - DELETE /tweets/:id

## Admin Notes
- To promote a user to admin initially, set `role: "admin"` in MongoDB for that user, then log out and log back in so the token reflects the role.
- Admin Dashboard allows creating users, updating roles, and deleting users/tweets.

## Deployment Notes
- Frontend (Netlify): Base dir `frontend`, build `npm run build`, publish `frontend/dist`.
- Backend (Render): Set env vars (`MONGO_URI`, `JWT_SECRET`, `PORT`).
- SPA redirects: Netlify serves index.html for deep routes.
- PWA: Manifest and service worker included; install via browser prompt.