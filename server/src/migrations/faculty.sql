
CREATE TABLE  IF NOT EXISTS faculty (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
    
    faculty_name TEXT NOT NULL,

    created_by TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

