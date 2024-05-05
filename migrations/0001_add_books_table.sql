-- Migration number: 0001 	 2024-05-05T02:32:45.296Z
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT
);