# Smart Leads Dashboard

Smart Leads Dashboard is a full-stack MERN CRM application used to manage leads, track analytics, and monitor business growth with role-based authentication and a modern responsive UI.

---

# Features

- User Authentication (JWT)
- Role-Based Access (Admin/User)
- Add / Edit / Delete Leads
- Search & Multi Filtering
- Lead Analytics Dashboard
- Charts & Graphs
- CSV Export
- Pagination
- Dark Mode
- Responsive Design
- Protected Routes
- REST API Integration

---

# Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# Folder Structure

```bash
frontend/
backend/
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/smart-leads-dashboard.git
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

# Admin Credentials

You can manually create admin in MongoDB:

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "hashed_password",
  "role": "admin"
}
```

---

# Screenshots

Add project screenshots here.

---

# API Endpoints

## Auth

- POST `/api/auth/register`
- POST `/api/auth/login`

## Leads

- GET `/api/leads`
- POST `/api/leads`
- PUT `/api/leads/:id`
- DELETE `/api/leads/:id`

## Dashboard

- GET `/api/dashboard/stats`

---

# Future Improvements

- Real-time notifications
- Email integration
- Lead assignment
- AI lead scoring
- Team collaboration

---

# Author

Smily

---

# License

This project is licensed under the MIT License.
