
--  Serial: Uses standard 4-byte integers, allowing for incredibly fast indexing, joins, and sorting. They are highly cache-friendly.

CREATE TABLE IF NOT EXISTS events(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    event_name VARCHAR(50) NOT NULL,

    description TEXT NOT NULL,

    location VARCHAR(255) NOT NULL ,

    entry_fee INT NOT NULL,

    price_pool JSONB NOT NULL,

    start_date TIMESTAMP NOT NULL,

    end_date DATE DEFAULT NULL,

    -- status: "upcoming" | "ongoing" | "completed" | "cancelled",
    status VARCHAR(25) DEFAULT 'upcoming' ,

    is_approved  BOOLEAN NOT NULL DEFAULT false ,

    created_by UUID,
    CONSTRAINT fk_user
        FOREIGN KEY (created_by)
        REFERENCES users(id),

    faculty_allowed UUID[],

    image_url TEXT NOT NULL,
    public_id TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
 
);


