# Blog API

A clean, JWT-secured REST API for managing users, posts, comments, and categories built with Node.js, Express, and MongoDB (Mongoose).

## Overview
- Authentication with JWT (register/login)
- Authorization on write routes (POST/PUT/DELETE) using `authorId` from JWT
- CRUD for Posts, Comments, Categories, Users
- File uploads via Multer, served from `/images`

## Tech Stack
- Node.js (ES Modules), Express
- MongoDB, Mongoose
- JWT for authentication
- Multer for uploads

## Requirements
- Node.js 18+
- MongoDB (local or Atlas)

## Setup
1) Install dependencies
```bash
npm install
```
2) Create `.env` in `blog-api/`
```
MONGO_URL=mongodb://localhost:27017/blog_api
JWT_SECRET=change-this-to-a-strong-random-string
```
For Atlas, use `mongodb+srv://...` and whitelist your IP.

3) Start the server
```bash
npm start
```
App: `http://localhost:5000`

## Scripts
- `npm start` – run with nodemon

## Project Structure
```
blog-api/
  index.js
  middleware/
    auth.js
    validation.js
  models/
    user.js
    post.js
    comment.js
    category.js
  routes/
    auth.js
    users.js
    post.js
    comments.js
    categories.js
  docs/
    README_API.md
    openapi.yaml
  tests/
    test.txt
  package.json
```

## API (summary)
Base URL: `http://localhost:5000`

Auth header for protected endpoints:
```
Authorization: Bearer <token>
```

- Auth
  - POST `/api/auth/register`
  - POST `/api/auth/login` → `{ user, token }`

- Users (protected)
  - GET `/api/user/:id`
  - PUT `/api/user/:id`
  - DELETE `/api/user/:id`

- Posts (aliases provided to match brief)
  - GET `/api/post` (alias `/posts`)
  - GET `/api/post/:id`
  - POST `/api/post` (protected)
  - PUT `/api/post/:id` (protected, owner only)
  - DELETE `/api/post/:id` (protected, owner only)

- Comments (aliases provided to match brief)
  - GET `/api/comments/:id` (alias `/comments/:id`)
  - GET `/api/comments/post/:postId` (alias `/comments?post_id=<postId>` via client mapping)
  - POST `/api/comments` (protected)
  - PUT `/api/comments/:id` (protected, owner only)
  - DELETE `/api/comments/:id` (protected, owner only)

- Categories
  - GET `/api/categories`
  - GET `/api/categories/:id`
  - POST `/api/categories`

See detailed docs:
- `docs/README_API.md` (guide)
- `docs/openapi.yaml` (OpenAPI – import into Swagger/Postman)

## Auth Flow
1) Register via `/api/auth/register`
2) Login via `/api/auth/login` and copy `token`
3) Use `Authorization: Bearer <token>` on protected routes

## File Uploads
Endpoint: `POST /api/upload` (form-data `file`). Files are saved under `/images` and served at `GET /images/<filename>`.

## Notes
- Input validation via `express-validator` (see `middleware/validation.js`)
- Centralized error handler normalizes error responses

