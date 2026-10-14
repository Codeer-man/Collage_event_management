

CREATE TABLE IF NOT EXISTS location(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    description VARCHAR(100),
    capacity INTEGER ,
    is_available BOOLEAN NOT NULL DEFAULT TRUE ,
    created_AT TIMESTAMPTZ NOT NULL DEFAULT NOW()

);
