# FocusFlow - Digital Balance and Productivity Tracker

FocusFlow is a full-stack web application developed to help users monitor and manage their digital productivity activities.

The project follows:
- MVC Architecture
- Multi-Tier Architecture
- REST API Design Principles

---

# Technologies

## Backend
- Node.js
- Express.js
- SQLite
- JWT Authentication
- Swagger API Documentation
- Jest Unit Testing

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- LocalStorage

---

# Project Structure

```text
focusflow/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── activityController.js
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── activityService.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   └── validateMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Activity.js
│   │   │
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       └── activityRoutes.js
│   │
│   ├── tests/
│   │   └── activityService.test.js
│   │
│   ├── swagger.json
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── apiClient.js
│   │   │
│   │   ├── utils/
│   │   │   └── auth.js
│   │   │
│   │   └── app.js
│   │
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# Features

- User Registration
- User Login
- JWT Authentication
- Productivity Activity Tracking
- Activity Listing
- Activity Deletion
- REST API Architecture
- Swagger API Documentation
- Unit Testing

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

or:

```bash
npm start
```

Backend runs on:

```text
http://localhost:3000
```

Swagger API Documentation:

```text
http://localhost:3000/api-docs
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Run frontend using Live Server extension
or:

```bash
npx serve public -p 8080
```

Frontend runs on:

```text
http://localhost:8080
```

---

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Activities

```http
GET /api/activities
POST /api/activities
DELETE /api/activities/:id
```

---

# Unit Tests

Run unit tests:

```bash
cd backend
npm test
```

---

# Architecture Notes

- Controllers handle HTTP requests and responses.
- Services contain core business logic.
- Routes only manage endpoint routing.
- Middlewares handle authentication and validation.
- SQLite is used as the lightweight relational database.
- JWT is used for secure authentication.