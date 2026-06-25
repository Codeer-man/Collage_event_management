
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    full_name VARCHAR(20) NOT NULL,

    email VARCHAR(20) UNIQUE NOT NULL ,

    password VARCHAR(100)  NOT NULL ,

    role TEXT NOT NULL DEFAULT 'student',

    faculty_id UUID,
    CONSTRAINT fk_faculty -- db validation (fk_faculty is validation name given by developer(me))
        FOREIGN KEY (faculty_id)
        REFERENCES faculty(id),

    image_url TEXT NOT NULL,
    public_id Text NOT NULL,

    contact_number varchar(10) NOT NULL,

    is_email_verified BOOLEAN DEFAULT false,
      
    is_approved_stident BOOLEAN DEFAULT false ,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

