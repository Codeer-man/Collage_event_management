server/
├── src/
│ ├── config/
│ │ ├── migrate.ts
│ │ └── pool.ts
│ ├── lib/
│ │ ├── getUrl.ts
│ │ ├── hash.ts
│ │ ├── sendEmail.ts
│ │ └── token.ts
│ ├── middleware/
│ │ ├── auth.middleware.ts
│ │ ├── errorHandling.ts
│ │ └── not-found.ts
│ ├── migration/
│ │ └── 01_user.sql
│ ├── model/
│ │ ├── auth/
│ │ │ └── user.model.ts
│ ├── route/
│ │ ├── auth/
│ │ │ └── auth.route.ts
│ ├── utils/
│ │ ├── AppError.ts
│ │ ├── asyncHandler.ts
│ │ ├── cloudinary.ts
│ │ ├── envolve.ts
│ │ └── helper.ts
│ ├── app.ts
│ └── server.ts
├── .env
├── .gitignore
├── package.json
└── package-lock.json
