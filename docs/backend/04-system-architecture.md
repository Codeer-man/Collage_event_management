# System Architecture

## Overview

The College Event Management System (CEMS) follows a three-tier architecture consisting of the Presentation Layer, Application Layer, and Database Layer.

Each layer performs a specific task and communicates with the next layer to process user requests.

## Architecture Diagram

```text
+---------------------------+
|        Frontend           |
|   (React + TypeScript)    |
+------------+--------------+
             |
             | HTTP Request
             ▼
+---------------------------+
|      Express Server       |
|      REST API Backend     |
+------------+--------------+
             |
             | Business Logic
             ▼
+---------------------------+
|      PostgreSQL DB        |
+---------------------------+
```

## Components

### Frontend

- Provides the user interface.
- Sends HTTP requests to the backend.
- Displays data received from the server.

### Backend

The backend is responsible for:

- User authentication
- Authorization
- Event management
- Student management
- Faculty management
- File upload
- Email verification
- Database operations

It processes client requests and returns the appropriate response.

### Database

PostgreSQL stores all application data, including:

- Users
- Faculties
- Events
- Registrations
- Event approvals

The backend communicates directly with the database using SQL queries.

## Request Flow

The general flow of a request is shown below:

```
User
   │
   ▼
Frontend
   │
   ▼
Express Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Database
   │
   ▼
Response
```

## Advantages

- Modular and easy to maintain
- Clear separation of responsibilities
- Easy to add new features
- Secure API with authentication and authorization
