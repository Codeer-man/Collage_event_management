## Api gateway

URL
http://localhost:5000/

## Auth

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

# check auth : check if the user is authenticated or logged in with cookie

METHOD:GET
/auth/check-auth

# faculty : get all the faculty name ,id and faculty code

METHOD:GET
/auth/faculty

## Administratuve

## Admin

# get unapproved students

METHOD:GET
/admin/students

# approve students

METHOD:PATCH
/admin/approve

# get events

METHOD:GET
/admin/events

# approve events

METHOD:PATCH
/admin/events/:status
