-- Event status
-- CREATE TYPE  event_status AS ENUM (
--     'pending',
--     'approved',
--     'rejected',
--     'completed',
--     'cancelled'
-- );
-- CREATE TYPE  location_type AS ENUM (
--    'internal',
--    'external'
-- );

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    location_type location_type NOT NULL,

    location_id UUID ,
    CONSTRAINT fk_location_id
        FOREIGN KEY (location_id)
        REFERENCES location(id)
        ON DELETE RESTRICT,

    location_name VARCHAR(20),

    event_date TIMESTAMP NOT NULL,

    registration_deadline TIMESTAMP NOT NULL,

    entry_fee INT DEFAULT 0,

    contact varchar(25) NOT NULL,

    image_url TEXT,
    public_id Text,

    created_by UUID NOT NULL,
    CONSTRAINT fk_events_creator
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE CASCADE,

    status event_status NOT NULL DEFAULT 'pending',

    is_team_event BOOLEAN NOT NULL DEFAULT FALSE,

    max_participants INTEGER CHECK (max_participants > 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_events_status
ON events(status);

CREATE INDEX IF NOT EXISTS idx_events_date
ON events(event_date);

CREATE INDEX IF NOT EXISTS idx_events_creator
ON events(created_by);