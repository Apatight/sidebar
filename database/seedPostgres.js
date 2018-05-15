CREATE DATABASE apatight IF NOT EXISTS;

\connect apatight;

CREATE TABLE places IF NOT EXISTS (
	"id" int,
  "name" text,
  "menu_url" text,
  "address" text,
  "location" text,
  "url" text,
  "phone" text,
  "hours" text[],
  "lat" text,
  "lng" text,
  PRIMARY KEY ("id")
);

COPY sidebar ('id', 'name', 'menu_url', 'address', 'location', 'url', 'phone', 'hours', 'lat', 'lng')
FROM '/Users/jessicarahman/Desktop/sidebar/database/zagatData.csv'
DELIMITER ',' CSV HEADER;