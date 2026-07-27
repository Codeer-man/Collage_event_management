# 🎓 College Event Management System (CEMS)

> A modern web-based platform for managing college events with faculty-based access control, role management, event approval workflow, and secure authentication.
>
> **Status:** 🚧 Currently in Development

<p align="center">

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-Backend-000000?style=for-the-badge&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-Caching-DC382D?style=for-the-badge&logo=redis&logoColor=white)

</p>

---

# 📖 About the Project

The **College Event Management System (CEMS)** is a web-based application developed to simplify the process of organizing and managing college events.

The system provides a structured workflow where students can register, participate in events, and become organizers after receiving permission from the faculty admin. Every event follows an approval process before it becomes visible to students.

The platform is designed with **role-based access control**, ensuring that every user has access only to the features assigned to their role.

---

# ✨ Key Features

## 🔐 Authentication

- User Registration
- Secure Login
- Email Verification via Verification Link
- JWT Authentication
- Role-Based Authorization

---

## 👨‍💼 Administrative

- Create Faculties
- Assign Faculty Admins

---

## 👨‍🏫 Faculty Admin

- Verify Newly Registered Students & Approve Student Accounts
- Assign Organizer Role
- Approve or Reject Events
- Manage Faculty Events

---

## 👨‍🎓 Student

- Register Account
- Verify Email
- Join Events
- View Faculty Events

---

## 🎯 Organizer

Organizer is **not a separate account type**.

A student becomes an organizer after being granted permission by the Faculty Admin.

Organizers can:

- Create Events
- Upload Event Banner
- Edit Events
- Manage Event Participants

---

# 🏛 Role Hierarchy

```text
Administrative
      │
      ▼
     Admin
      │
      ▼
    Student
      │
      ▼
   Organizer
```

---

# 🔄 Event Approval Workflow

```text
Organizer
     │
Create Event
     │
     ▼
Pending Approval
     │
     ▼
   Admin
     │
Approve / Reject
     │
     ▼
Visible to Students
```

Only approved events are visible to students.

Students can only view events belonging to their own faculty.

---

# 🏗 System Architecture

```text
                 React + TypeScript
                         │
                         ▼
                  Express REST API
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
 PostgreSQL         Cloudinary         Redis
        │
        ▼
 Raw SQL + SQL Migrations
```

---

# 🛠 Tech Stack

| Technology    | Purpose                  |
| ------------- | ------------------------ |
| React         | Frontend                 |
| TypeScript    | JS Type Safety           |
| Express.js    | Backend API              |
| Node.js       | Runtime Environment      |
| PostgreSQL    | Database                 |
| Raw SQL       | Database Queries         |
| SQL Migration | Database Version Control |
| Redis         | Caching & Rate Limiting  |
| Cloudinary    | Image Upload             |
| Shadcn UI     | Reusable UI Components   |

---

# 📂 Project Structure

```text
College-Event-Management/
│
├── client/
│   ├── public/
│   ├── src/
│   │      ├── assets/
│   │      ├── components/
│   │      ├── feature/
│   │      ├── hooks/
│   │      ├── layers/
│   │      ├── lib/
│   │      ├── page/
│   │      └── store/
│   ├── App.tsx
│   ├── index.css
│   ├── layout.tsx
│   ├── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── migration/
│   │   ├── model/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── coming soon (not fixed)
│   ├──
│   └──
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Codeer-man/College_event_management.git
```

---

## Install Frontend

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Install Backend

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# ⚙ Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

# Frontend URL
FRONTEND_URL=http://localhost:5173

# PostgreSQL Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=Event_management

# JWT
JWT_ACCESS_SECRET=

# Email Service resenf
RESEND_API_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# 📡 API Documentation

Detailed API documentation can be found inside the **docs** folder.

Example endpoints include:

### Authentication

- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/verify-email`

### Student

- GET `/student/profile`
- PUT `/student/profile`

### Events

- GET `/events`
- GET `/events/:id`
- POST `/events`
- PUT `/events/:id`
- DELETE `/events/:id`

### Faculty Admin

- GET `/admin/students`
- PUT `/admin/verify-student`
- PUT `/admin/assign-organizer`
- PUT `/admin/approve-event`

---

# 📷 Screenshots

Project screenshots will be added as development progresses.

```text

```

---

# 🚀 Planned Features

- QR Code Attendance System
- Event Search & Filtering
- User Profile Improvements
- Event Categories
- Dashboard Enhancements
- Performance Optimization
- Responsive Design Improvements

---

# 💡 Why This Project?

The goal of this project is to create a centralized platform that simplifies event management within a college.

The system introduces structured role management, faculty-based access control, secure authentication, and an approval workflow to ensure that events are managed efficiently while remaining accessible only to the intended audience.

---

# 🤝 Contributing

Contributions, suggestions, and feedback are always welcome.

If you'd like to improve the project:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your fork.
5. Open a Pull Request.

---

# 📄 License

This project is developed for educational purposes.

Feel free to use it as a learning resource.

---

# 👨‍💻 Author

**Manish Manandhar** <br/>
**Anup Bhujel**

MERN Stack Developer

---

<p align="center">
Made with passion using React, TypeScript, Express, PostgreSQL, Redis, and Cloudinary.
</p>
