# Database Design

## Overview

The CEMS backend uses **PostgreSQL** as its relational database. It stores information related to users, faculties, events, registrations, and other application data.

The database is normalized to reduce data redundancy and maintain data consistency.

---

## Main Tables

The following tables are used in the system:

| Table                 | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `users`               | Stores user information such as students, admins, and super admin. |
| `faculties`           | Stores faculty details.                                            |
| `events`              | Stores event information.                                          |
| `event_registrations` | Stores student registrations for events.                           |
| `teams`               | Stores team information for team events.                           |

---

## Relationship Overview

```text
Faculties
     │
     │ 1
     ▼
Users
     │
     │ 1
     ▼
Events
     │
     │
     ▼
Event Registrations

Teams
   │
   ▼
Team Members
```

---

## Database Features

- PostgreSQL relational database
- Primary and foreign key relationships
- Indexed columns for faster queries
- Database migrations for schema management
- Support for transactions where required
