
CREATE TABLE  IF NOT EXISTS faculty (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
    
    faculty_name TEXT NOT NULL,

    program_code TEXT NOT NULL UNIQUE,

    user_id UUID UNIQUE DEFAULT NULL,
    CONSTRAINT fk_users
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

