--! For Login System

CREATE TABLE userdata(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    userid VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (email, userid)
);

--! For TODO APP

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    descripation VARCHAR(255)
);