DROP TABLE IF EXISTS trips CASCADE;


CREATE TABLE trips (
  id SERIAL PRIMARY KEY NOT NULL,

  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
)
