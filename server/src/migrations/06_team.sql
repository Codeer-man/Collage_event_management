CREATE TABLE  IF NOT EXISTS teams(
    id BIGSERIAL PRIMARY KEY,

    event_id BIGINT NOT NULL,
    CONSTRAINT fk_team_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    team_name VARCHAR(100) NOT NULL,

    leader_id UUID NOT NULL,
    CONSTRAINT fk_team_leader
        FOREIGN KEY (leader_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_team_name
        UNIQUE (event_id, team_name)
);
