# 🌿 FocusFlow — Digital Balance & Productivity Tracker


# 📌 Project Overview

FocusFlow is a modern full-stack productivity tracking web application developed using **Node.js**, **Express.js**, **SQLite**, and **Vanilla JavaScript**.

The application helps users monitor their digital habits, analyze productive and unproductive screen time, manage daily productivity goals, and improve their digital balance through interactive analytics and personalized tracking.

---

# 🎯 Project Purpose

The goal of this project is to provide users with a clean and user-friendly platform where they can:

- Track daily application usage
- Analyze productivity habits
- Manage digital balance goals
- Monitor screen time
- Visualize usage statistics
- Improve time management

The project follows a modular RESTful architecture and includes authentication, API documentation, analytics calculations, and unit testing.

---

# ✨ Main Features

## 🔐 Authentication System
- User registration
- User login
- JWT-based authentication
- Protected API routes
- Secure password hashing using bcryptjs

---

## 📱 Usage Record Management

Users can manage their daily digital usage records.

### Features
- Add usage records
- Update usage records
- Delete usage records
- View personal usage history

### Tracked Data
- Application name
- Category
- Duration
- Usage date

---

## 📊 Productivity Analytics

The system automatically calculates productivity statistics and analytics.

### Analytics Features
- Total screen time
- Productive time
- Unproductive time
- Productivity score
- Most used application
- Top used applications

---

## 🎯 Goal Management

Users can create daily productivity goals for applications.

### Goal Features
- Create goals
- Set target minutes
- Track progress
- Visual progress bars
- Goal exceeded detection
- Delete goals

### Example Goals

```txt
Instagram → 60 min
YouTube → 90 min
Netflix → 40 min
```



# 🛠 Technologies Used

## Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- bcryptjs
- Swagger UI Express
- swagger-jsdoc

---

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome

---

## Testing
- Jest

---

# 🏗 Software Architecture

The project follows a modular layered architecture.

## Controllers
Handle request and response operations.

## Routes
Define REST API endpoints.

## Services
Contain business logic and analytics calculations.

## Middleware
Manage JWT authentication and authorization.

## Database Layer
SQLite database integration and table management.

---

# 📁 Project Structure

```txt
FOCUSFLOW/
│
├── backend/
│   │
│   ├── node_modules/
│   │
│   ├── src/
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── goalController.js
│   │   │   ├── statsController.js
│   │   │   └── usageController.js
│   │   │
│   │   ├── db/
│   │   │   └── database.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── goalRoutes.js
│   │   │   ├── statsRoutes.js
│   │   │   └── usageRoutes.js
│   │   │
│   │   └── services/
│   │       ├── analyticsService.js
│   │       ├── goalService.js
│   │       └── statsService.js
│   │
│   ├── tests/
│   │   ├── analyticsService.test.js
│   │   ├── goalService.test.js
│   │   └── statsService.test.js
│   │
│   ├── .env
│   ├── app.js
│   ├── focusflow.db
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── swagger.js
│
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── style.css
│
├── .gitignore
└── README.md
```

---

# 🌐 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT token |

---

## Usage Records

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/usage` | Get all usage records |
| POST | `/api/usage` | Create usage record |
| PUT | `/api/usage/:id` | Update usage record |
| DELETE | `/api/usage/:id` | Delete usage record |

---

## Goals

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/goals` | Get all goals |
| POST | `/api/goals` | Create goal |
| DELETE | `/api/goals/:id` | Delete goal |

---

## Statistics

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/stats` | Get productivity statistics |

---

# 📘 Swagger Documentation

Swagger/OpenAPI documentation is available at:

```txt
http://localhost:5000/api-docs
```

Swagger features:
- API testing
- JWT authorization
- Endpoint documentation
- Request/response schemas

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
```

---

## 2. Install Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Start Backend Server

```bash
npm start
```

Server runs on:

```txt
http://localhost:5000
```

---

## 5. Open Frontend

Open:

```txt
frontend/index.html
```

in your browser.

---

# ✅ Running Tests

Run unit tests using:

```bash
npm test
```

Example output:

```txt
PASS tests/statsService.test.js
PASS tests/goalService.test.js
PASS tests/analyticsService.test.js
```

---

# 🧪 Unit Testing

The project includes unit testing for business logic functions.

### Tested Modules
- analyticsService.js
- goalService.js
- statsService.js

### Tested Features
- Productivity score calculations
- Goal progress calculations
- Goal exceeded detection
- Most used application detection
- Total screen time calculations

---

# 🚀 Future Improvements

Possible future improvements for the project:

- Weekly analytics charts
- Monthly productivity reports
- Dark mode support
- Mobile responsive optimization
- Notification system
- Data visualization with charts
- Export reports as PDF
- User profile settings

---

# 👩‍💻 Author

Developed as a full-stack web application project for academic coursework system analysis & design.
