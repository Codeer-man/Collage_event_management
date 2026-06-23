## folder structiure

# config

path: /server/src/config

file: pool.ts
Responsible for configuring and connecting to the PostgreSQL database.

file: migrate.ts
Executes database migrations.
Note:
Write all SQL migration queries inside the migration folder before running migrations.

# lib

path: /server/src/lib

file: getUrl.ts
get the frontendUrl

file : hash.ts
encrupty and compare the password from auth

file : sendEmail.ts
send email

file: token.ts
creating and verifying token using jsonwebtoken (jwt)
