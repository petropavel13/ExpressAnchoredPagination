-- Up

PRAGMA foreign_keys = off;

CREATE TABLE messages (
    id         CHAR (36) NOT NULL
                         PRIMARY KEY
                         UNIQUE,
    created_at DATETIME  NOT NULL
                         DEFAULT (CURRENT_TIMESTAMP),
    body       TEXT      NOT NULL
);

-- Populate test data

INSERT INTO messages (id, created_at, body) VALUES ('b500f4df-db19-4bc8-8913-6af25c228b0c', '2017-05-22 11:51:12', 'first message');
INSERT INTO messages (id, created_at, body) VALUES ('311c7064-80c5-4473-894d-b0ebebe5ef28', '2017-05-22 11:51:24', 'second message');
INSERT INTO messages (id, created_at, body) VALUES ('f1c52194-1404-44a1-924c-319e89a1ba71', '2017-05-22 12:10:39', 'four message');
INSERT INTO messages (id, created_at, body) VALUES ('f25566cb-3175-4725-99ff-6f56c6a30075', '2017-05-22 12:00:39', 'third message');

PRAGMA foreign_keys = on;


-- Down
DROP TABLE IF EXISTS messages;