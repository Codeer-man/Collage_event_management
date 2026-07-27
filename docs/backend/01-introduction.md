# Introduction

The College Event Management System (CEMS) Backend is a RESTful API designed to support the College Event Management System. It serves as the core of the application by handling all business logic, managing the database, and providing secure communication between the frontend and the database.

The backend is developed using **Node.js**, **Express.js**, and **TypeScript**, while **PostgreSQL** is used as the relational database. The project follows a modular architecture, where different functionalities are separated into routes, middleware, services, and utility modules. This structure improves code readability, maintainability, and makes future development easier.

The system is designed to support different types of users, each with specific responsibilities. The **Super Admin** manages faculties and assigns faculty administrators. **Faculty Admins** are responsible for approving students, managing events within their faculty, and overseeing student activities. **Students** can register, participate in events, and perform actions based on the permissions assigned to them.

The backend provides secure REST APIs for user authentication, authorization, event management, student management, faculty management, file uploads, email verification, and other core features. Authentication is handled using JSON Web Tokens (JWT), while middleware is used to protect routes and restrict access based on user roles.

To ensure reliable data management, PostgreSQL is used to store information related to users, faculties, events, registrations, and other application data. Database migrations are included to simplify database setup and maintain consistency across different environments.

This documentation explains the installation process, project structure, database design, API endpoints, authentication flow, testing process, and other important components of the backend. It is intended to help developers understand the project's architecture and make future maintenance or feature development easier.

# Project Structure

```
server/
├── docs/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── validations/
│   ├── app.ts
│   └── server.ts
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

## Folder Description

| Folder         | Description                        |
| -------------- | ---------------------------------- |
| `docs/`        | Project documentation              |
| `config/`      | Configuration files                |
| `controllers/` | Handles API requests and responses |
| `database/`    | Database queries and migrations    |
| `middleware/`  | Authentication and validation      |
| `routes/`      | API routes                         |
| `services/`    | Business logic                     |
| `types/`       | TypeScript types and interfaces    |
| `utils/`       | Utility functions                  |
| `validations/` | Request validation schemas         |
| `tests/`       | API and unit tests                 |
