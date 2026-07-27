# Installation

Follow the steps below to set up the CEMS backend on your local machine.

## 1. Clone the Repository

Clone the repository:

```bash
https://github.com/Codeer-man/Collage_event_management.git
```

Move into the project directory:

```bash
cd ./server
```

---

## 2. Install Dependencies

Install all required packages:

```bash
npm install
```

or

```bash
npm i
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables.

```env
PORT=5000

APP_URL="http://localhost:5000"
NODE_ENV="development"

# cors policy = to gep permisson to interact with frontend
FRONTEND_URL="http://localhost:5173"

# database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=Event_management

# jsonwebtoken for authentication
JWT_ACCESS_SECRET='mt_secret'

# resend api key for email
RESEND_API_KEY=

# cloudinayr for image
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_KEy=
```

---

## 4. Run Database Migration

Run the migration command to create the database tables.

```bash
npm run db:migrate
```

---

## 5. Start the Development Server

Start the server in development mode.

```bash
npm run dev
```

The server will be available at:

```text
http://localhost:5000
```

---

## 6. Verify the Installation

If the server starts without errors, the backend has been installed successfully.
