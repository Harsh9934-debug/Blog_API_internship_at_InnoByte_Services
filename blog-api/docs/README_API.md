# Blog API – Documentation

Base URL: `http://localhost:5000`

Auth: JWT Bearer tokens. Add header:
- `Authorization: Bearer <token>`

Environment (.env):
- `MONGO_URL=...`
- `JWT_SECRET=your-strong-secret`

## Auth

POST `/api/auth/register`
- Body: `{ username, email, password }`
- 200 → User document

POST `/api/auth/login`
- Body: `{ username, password }`
- 200 → `{ user, token }`

## Users (Protected)

GET `/api/user/:id`
- Auth: Bearer
- 200 → User (password omitted)

PUT `/api/user/:id`
- Auth: Bearer (only same user)
- Body: any updatable fields; if `password` present it will be re-hashed
- 200 → Updated user

DELETE `/api/user/:id`
- Auth: Bearer (only same user)
- 200 → "Account has been deleted"

## Posts

POST `/api/post`
- Auth: Bearer
- Body: `{ title, desc, photo?, categories?: string[], username? }`
- Note: `authorId` is derived from JWT automatically
- 201 → Created post

PUT `/api/post/:id`
- Auth: Bearer (must be the post author)
- Body: updatable fields
- 200 → Updated post

DELETE `/api/post/:id`
- Auth: Bearer (must be the post author)
- 200 → "Post has been deleted"

GET `/api/post/:id`
- 200 → Post

GET `/api/post`
- Query (optional): `user=<username>`, `cat=<category>`
- 200 → Post[]

## Categories

POST `/api/categories`
- Body: `{ name }`
- 200 → Category

GET `/api/categories`
- 200 → Category[]

GET `/api/categories/:id`
- 200 → Category

## Comments

POST `/api/comments`
- Auth: Bearer
- Body: `{ postId, content }`
- Note: `authorId` is derived from JWT automatically
- 201 → Created comment

PUT `/api/comments/:id`
- Auth: Bearer (must be the comment author)
- Body: updatable fields e.g. `{ content }`
- 200 → Updated comment

DELETE `/api/comments/:id`
- Auth: Bearer (must be the comment author)
- 200 → "Comment has been deleted"

GET `/api/comments/:id`
- 200 → Comment

GET `/api/comments/post/:postId`
- 200 → Comment[] for given post

## Uploads

POST `/api/upload`
- Form-data: `file` (type: file)
- Saves to `/images/<generated-name>`
- 200 → "File has been uploaded"

GET `/images/<filename>`
- Serves uploaded files

## Models (shape)

Post
- `{ _id, title, desc, photo?, categories?: string[], authorId, username?, createdAt, updatedAt }`

Comment
- `{ _id, postId, content, authorId, createdAt, updatedAt }`

Category
- `{ _id, name, createdAt, updatedAt }`

User (response)
- `{ _id, username, email, profilepic?, createdAt, updatedAt }`

## Error shape
- 4xx/5xx → string or `{ message, details? }`

## OpenAPI
A complete OpenAPI spec is provided at `docs/openapi.yaml`. Import it in Swagger UI or Postman.
