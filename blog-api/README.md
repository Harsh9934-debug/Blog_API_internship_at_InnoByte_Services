# Blog API

A clean, JWT-secured REST API for managing users, posts, comments, and categories built with Node.js, Express, and MongoDB (Mongoose).

## Table of Contents
- Introduction
- Tech Stack
- Getting Started
- Environment Variables
- NPM Scripts
- Project Structure
- API Overview
- Authentication Workflow
- File Uploads
- Documentation
- Testing (Next Steps)
- License

## Introduction
This service exposes endpoints to register/login users, create and manage blog posts and comments with proper authorization, and manage categories. Write actions (POST/PUT/DELETE) on posts and comments are protected by JWT and enforce ownership using the user ID from the token.

## Tech Stack
- Runtime: Node.js (ES Modules)
- Framework: Express
- Database: MongoDB + Mongoose
- Auth: JSON Web Tokens (JWT)
- Uploads: Multer (disk storage)

## Getting Started
1) Clone and install
```bash
git clone <repo-url>
cd blog-api
npm install
```

2) Configure environment (see below) and ensure MongoDB is reachable (local or Atlas).

3) Start the server
```bash
npm start
```
Server runs on http://localhost:5000

## Environment Variables
Create a `.env` file in `blog-api/`:
```
MONGO_URL=mongodb://localhost:27017/blog_api
JWT_SECRET=change-this-to-a-strong-random-string
```
For MongoDB Atlas, use your `mongodb+srv://...` connection string and whitelist your IP.

## NPM Scripts
- `npm start` – run the API with nodemon

## Project Structure
```
blog-api/
  index.js                # App entrypoint
  middleware/
    auth.js               # JWT verification helpers
  models/
    user.js               # User model
    post.js               # Post model (authorId)
    comment.js            # Comment model (authorId)
    category.js           # Category model
  routes/
    auth.js               # Register/Login
    users.js              # Get/Update/Delete user (protected)
    post.js               # Posts CRUD (protected writes)
    comments.js           # Comments CRUD (protected writes)
    categories.js         # Categories create/list/get
  docs/
    README_API.md         # Human-friendly API guide
    openapi.yaml          # OpenAPI 3.1 spec
  package.json
```

## API Overview
Base URL: `http://localhost:5000`

Auth header for protected endpoints:
```
Authorization: Bearer <token>
```

- Auth
  - POST `/api/auth/register` – create user
  - POST `/api/auth/login` – returns `{ user, token }`

- Users (protected)
  - GET `/api/user/:id`
  - PUT `/api/user/:id` (owner only)
  - DELETE `/api/user/:id` (owner only)

- Posts
  - GET `/api/post` – optional `?user=<username>` or `?cat=<category>`
  - GET `/api/post/:id`
  - POST `/api/post` (protected) – `authorId` taken from JWT
  - PUT `/api/post/:id` (protected, owner only via `authorId`)
  - DELETE `/api/post/:id` (protected, owner only)

- Comments
  - GET `/api/comments/:id`
  - GET `/api/comments/post/:postId`
  - POST `/api/comments` (protected) – `authorId` from JWT
  - PUT `/api/comments/:id` (protected, owner only)
  - DELETE `/api/comments/:id` (protected, owner only)

- Categories
  - GET `/api/categories`
  - GET `/api/categories/:id`
  - POST `/api/categories`

## Authentication Workflow
1) Register a user via `/api/auth/register`.
2) Login via `/api/auth/login` and copy the `token`.
3) Call protected endpoints with `Authorization: Bearer <token>`.
4) Ownership checks compare `req.user.id` (from JWT) to the resource `authorId`.

## File Uploads
- Endpoint: `POST /api/upload`
- Form-data: `file` (type: file)
- Files are saved in `/images` and served at `GET /images/<filename>`.

## Documentation
- Human-readable guide: `docs/README_API.md`
- OpenAPI spec: `docs/openapi.yaml` (import into Swagger/Postman)

## Testing (Next Steps)
- Unit/Integration tests with Jest + Supertest
  - Examples: auth login, protected route access, post create/update/delete with ownership enforcement
- Consider adding CI and coverage reporting

