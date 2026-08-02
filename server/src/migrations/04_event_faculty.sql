CREATE TABLE IF NOT EXISTS event_faculties (
    event_id BIGINT NOT NULL,
    faculty_id UUID NOT NULL,

    PRIMARY KEY (event_id, faculty_id),

    CONSTRAINT fk_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_faculty_event
        FOREIGN KEY (faculty_id)
        REFERENCES faculty(id)
        ON DELETE CASCADE
);

