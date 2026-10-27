
-- CREATE TYPE team_invitation_status AS ENUM (
--     'pending',
--     'accepted',
--     'rejected'
-- );

CREATE TABLE IF NOT EXISTS team_invitations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    team_id BIGINT NOT NULL,
    invited_user_id UUID NOT NULL,
    invited_by UUID NOT NULL,

    status team_invitation_status NOT NULL DEFAULT 'pending',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    responded_at TIMESTAMPTZ,

    CONSTRAINT fk_team_id
        FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_invited_id
        FOREIGN KEY (invited_user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_invited_by
        FOREIGN KEY (invited_by)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT check_invitation_response
        CHECK (
            (status = 'pending' AND responded_at IS NULL)
            OR
            (status IN ('accepted', 'rejected') AND responded_at IS NOT NULL)
        )
);

CREATE UNIQUE INDEX unique_pending_team_invitation
ON team_invitations (team_id, invited_user_id)
WHERE status = 'pending';
