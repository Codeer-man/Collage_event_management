
-- faculty user_id
ALTER TABLE faculty
ADD COLUMN user_id UUID;

ALTER TABLE faculty
ADD CONSTRAINT fk_users
FOREIGN KEY (user_id)
REFERENCES users(id);