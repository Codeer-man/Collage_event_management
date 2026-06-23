## authentication (login/register/logou9t)

# URL

http://localhost:5000/
server/src

# register : create a new account

METHOD:POST
/auth/register

# login : access existing account

METHOD:POST
/auth/login

# verify email : after registration you get a message to the email your entered to confirm the email exists

METHOD:GET
/auth/verify-email

# logout

METHOD:GET
/auth/logout

# check auth : to validate the jwt access token and stay authenticated

METHOD:GET
/auth/check-auth
