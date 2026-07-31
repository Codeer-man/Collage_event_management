-- CREATE TABLE IF NOT EXISTS team_registrations (
--     id BIGSERIAL PRIMARY KEY,

--     event_id BIGINT NOT NULL,
--     team_id BIGINT NOT NULL,

--     registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--     FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
--     FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,

--     UNIQUE (event_id, team_id)
-- );