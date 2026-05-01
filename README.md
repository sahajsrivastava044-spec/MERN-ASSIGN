# Creators Platform

A modern MERN-style content creation platform with secure authentication, protected routes, post management, and a polished React frontend.

## ✨ Features

- 🔐 Secure authentication with JWT tokens
- 📝 Create, edit, view, and delete posts
- 🚪 Protected frontend routes for logged-in users
- 📦 REST API backend with Express and MongoDB
- 🧠 Auth state managed in React context
- 🧪 Built-in GitHub Actions CI support
- 🐳 Docker-ready architecture for local development and deployment
- 📱 Responsive page structure with React Router navigation

## 🧩 Tech Stack

- Frontend
  - React
  - React Router DOM
  - Axios
  - Vite
- Backend
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - bcrypt
  - JSON Web Tokens (JWT)
- Dev / Deployment
  - Docker / `docker-compose`
  - GitHub Actions
  - Jest + React Testing Library

## 📘 Application Flow

1. User visits the React frontend.
2. Public pages allow registration and login.
3. On login, the backend validates credentials and returns a JWT access token.
4. The frontend stores user info and token in local storage and React context.
5. Protected dashboard routes are guarded by `ProtectedRoute`.
6. Authenticated requests attach `Authorization: Bearer <token>` automatically using Axios interceptors.
7. The Express backend validates JWTs with `protect` middleware before returning or modifying post data.
8. Authenticated users can create, edit, delete, and browse their own posts.

## 🏛 Architecture Diagram

```mermaid
flowchart TD
  A[User Browser] -->|Open App| B[React Frontend]
  B -->|Route Guard| C{Public / Protected}
  C -->|Public| D[Login / Register]
  C -->|Protected| E[Dashboard / Create / Edit Post]
  E -->|API Call| F[Axios / api.js]
  F -->|Bearer JWT| G[Express Server]
  G -->|verify JWT| H[protect Middleware]
  H --> I[Controllers]
  I --> J[MongoDB via Mongoose]
  J -->|Data| I
  I -->|Response| F
  F -->|JSON| B
```

## 🧭 Detailed Flow

### Authentication

- `client/src/pages/Login.jsx` sends login requests to `/api/auth/login`.
- Server checks email and password in `server/controllers/authController.js`.
- If valid, JWT tokens are returned and saved in browser storage.
- `client/src/context/AuthContext.jsx` manages auth state and exposes `login`, `logout`, and `isAuthenticated`.

### Protected Routes

- `client/src/components/common/ProtectedRoute.jsx` prevents access to dashboard and post management routes unless the user is logged in.
- `client/src/components/common/PublicRoute.jsx` redirects logged-in users away from login/register pages.
- Protected page routes include `/dashboard`, `/create`, and `/edit/:id`.

### Post Management

- `client/src/pages/Dashboard.jsx` fetches paginated posts from `/api/posts` and renders them.
- `client/src/pages/CreatePost.jsx` submits new posts to `/api/posts`.
- `client/src/pages/EditPost.jsx` fetches a single post from `/api/posts/:id` and updates it with `PUT /api/posts/:id`.
- Deletes are sent through `DELETE /api/posts/:id`.

### Backend Routes

- `POST /api/users/register` — register a new user
- `POST /api/auth/login` — login and receive JWT
- `POST /api/auth/refresh` — refresh JWT tokens
- `GET /api/users` — fetch users list
- `GET /api/posts` — list authenticated user's posts
- `GET /api/posts/:id` — fetch a single post
- `POST /api/posts` — create a new post
- `PUT /api/posts/:id` — update an existing post
- `DELETE /api/posts/:id` — delete a post

## 📁 Key Files

- `client/src/App.jsx` — app routing and page layout
- `client/src/context/AuthContext.jsx` — auth state management
- `client/src/services/api.js` — Axios API client and token interceptor
- `server/server.js` — app startup, DB connection, and route registration
- `server/app.js` — Express middleware and route wiring
- `server/AuthMiddleware/protect.js` — JWT route protection
- `server/controllers/authController.js` — login and refresh logic
- `server/controllers/userController.js` — user CRUD actions
- `server/controllers/recipeController.js` — post CRUD logic

## 🚀 Getting Started

### Install dependencies

```bash
npm run install-all
```

### Run the app locally

```bash
npm run dev
```

This launches both the backend server and the React client.

### Run only the backend

```bash
npm run server
```

### Run only the frontend

```bash
npm run client
```

## 🌱 Environment Variables

Create a `.env` file in `server/` with values like:

```env
MONGODB_URI=mongodb://username:password@localhost:27017/yourdb
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:5173
```

> The repository also includes Cloudinary-related env placeholders in `server/.env.example` for future image upload support.

## 🧪 Testing & CI

- Frontend tests are powered by Jest and React Testing Library.
- GitHub Actions CI workflow is defined under `.github/workflows/ci.yml`.

## 🐳 Docker

The project is Docker-ready with `docker-compose.yml` in the root and Dockerfiles in both `server/` and `client/`.

---

## 💡 Notes

This repository is built to support a clean creator dashboard experience with token-based auth, a centralized API client, and easy extension paths for image upload or real-time features.
