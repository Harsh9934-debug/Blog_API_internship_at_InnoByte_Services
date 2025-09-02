# 📖 Blog API

A RESTful API for managing blog posts, users, comments, and categories.  
This project was developed as part of my internship at **InnoBytes Services**.

---

## 🚀 Features
- User Authentication & Authorization (JWT-based)
- CRUD operations for:
  - Users
  - Blog Posts
  - Comments
  - Categories/Tags
- Pagination & Filtering for posts
- Role-based access (Admin/User)
- Secure password hashing (bcrypt)
- Input validation & centralized error handling
- Environment variable configuration

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose  
- **Authentication:** JSON Web Tokens (JWT)  
- **Validation:** Joi / Express-Validator  
- **Security:** Helmet, bcrypt, CORS  
- **Testing (optional):** Jest, Supertest  

---

## 📂 Project Structure
blog-api/
├── src/
│ ├── config/ # DB config, JWT, environment setup
│ ├── controllers/ # Business logic for routes
│ ├── models/ # Database schemas/models
│ ├── routes/ # API route definitions
│ ├── middlewares/ # Authentication, validation, error handling
│ ├── utils/ # Helper functions
│ └── app.js # Express app
├── tests/ # Unit/Integration tests
├── .env # Environment variables
├── package.json
└── server.js # Application entry point


---

## 📌 API Endpoints

### 🔑 Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login user  
- `POST /api/auth/logout` → Logout user  

### 👤 Users
- `GET /api/users` → Get all users (Admin only)  
- `GET /api/users/:id` → Get user by ID  
- `PUT /api/users/:id` → Update user profile  
- `DELETE /api/users/:id` → Delete user account  

### 📝 Posts
- `GET /api/posts` → Get all posts (with pagination/filter)  
- `GET /api/posts/:id` → Get post by ID  
- `POST /api/posts` → Create new post (auth required)  
- `PUT /api/posts/:id` → Update post (owner only)  
- `DELETE /api/posts/:id` → Delete post (owner/admin)  

### 💬 Comments
- `GET /api/posts/:postId/comments` → Get comments for a post  
- `POST /api/posts/:postId/comments` → Add a comment  
- `PUT /api/comments/:id` → Update comment (owner only)  
- `DELETE /api/comments/:id` → Delete comment (owner/admin)  

### 🏷️ Categories
- `GET /api/categories` → Get all categories  
- `POST /api/categories` → Create category (Admin only)  
- `PUT /api/categories/:id` → Update category  
- `DELETE /api/categories/:id` → Delete category  

---

## 📌 Example Requests & Responses

### Register User
**Request:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Harsh",
  "email": "harsh@example.com",
  "password": "securePassword123"
}

Response:

{
  "message": "User registered successfully",
  "user": {
    "id": "64c1a8e4b5f6",
    "name": "Harsh",
    "email": "harsh@example.com"
  },
  "token": "jwt_token_here"
}

Create Post

Request:
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of the blog post.",
  "category": "Technology"
}

Responce:
{
  "message": "Post created successfully",
  "post": {
    "id": "64c1a9f2d8c4",
    "title": "My First Blog Post",
    "content": "This is the content of the blog post.",
    "author": "64c1a8e4b5f6",
    "category": "Technology",
    "createdAt": "2025-09-02T15:20:00Z"
  }
}

⚙️ Installation & Setup

clone this REPO

by 

git clone "then the url"
cd blog-api


Install Dependencies

npm install


Configure Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=mongodb://localhost:27017/blog_api
JWT_SECRET=your_secret_key


Run the developnment server

npm start



---
