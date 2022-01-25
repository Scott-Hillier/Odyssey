DROP TABLE IF EXISTS routes CASCADE;


CREATE TABLE routes (
  id SERIAL PRIMARY KEY NOT NULL,

  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  latitude DECIMAL(19,15) NOT NULL,
  longitude DECIMAL(19,15) NOT NULL,
  zoom INTEGER DEFAULT 10,
  theme TEXT
)
