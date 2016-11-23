DROP DATABASE IF EXISTS colors;
CREATE DATABASE colors;

\c colors;

CREATE TABLE color (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  text VARCHAR
);

INSERT INTO color (title, text)
  VALUES ('P9873459ost 2', 'rainbow');
