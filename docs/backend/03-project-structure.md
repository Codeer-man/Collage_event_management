# Project Structure

The backend follows a modular structure to separate different parts of the application. Each folder has a specific responsibility, making the project easier to understand, maintain, and extend.

## Directory Structure

```text
server/
├── docs/
├── src/
│   ├── config/
│   ├── lib/
│   ├── middleware/
│   ├── model/
│   │      ├── auth
│   │      └── faculty/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env/
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## Folder Description

| Folder        | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `docs/`       | Contains the project documentation.                               |
| `src/`        | Main source code of the application.                              |
| `config/`     | Configuration files such as database, migration and data seeding. |
| `lib/`        | Handles incoming requests and returns responses.                  |
| `migration/`  | Database table and migration                                      |
| `middleware/` | Authentication, not found and error handling                      |
| `model/`      | reuable database queries                                          |
| `routes/`     | Defines all API endpoints and controller.                         |
| `seed/`       | Insert necessay data into the database                            |
| `services/`   | Contains business logic used by controllers or routes.            |
| `types/`      | Custom TypeScript interfaces and types.                           |
| `utils/`      | Helper and utility functions.                                     |

## Project Flow

The backend follows a simple request flow:

```
Client
   │
   ▼
Route
   │
   ▼
Middleware
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

Each layer has a specific responsibility, which helps keep the code organized and easy to maintain.
