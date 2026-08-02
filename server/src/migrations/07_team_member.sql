CREATE TABLE  IF NOT EXISTS team_members(
    id BIGSERIAL PRIMARY KEY,

    team_id BIGINT NOT NULL,
    CONSTRAINT fk_member_team
        FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE CASCADE,

    user_id UUID NOT NULL,
    CONSTRAINT fk_member_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_team_member
        UNIQUE (team_id, user_id)
);