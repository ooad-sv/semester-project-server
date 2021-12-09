CREATE TABLE "Person" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "firstName" varchar,
  "lastName" varchar,
  "email" varchar UNIQUE,
  "hashedPassword" varchar,
  "isAdmin" boolean,
  "intervalNotificationsEnabled" boolean,
  "timeInterval" varchar,
  "alarmNotificationsEnabled" boolean,
  "minTemperature" float8,
  "maxTemperature" float8,
  "minPressure" float8,
  "maxPressure" float8,
  "minHumidity" float8,
  "maxHumidity" float8,
  "minAltitude" float8,
  "maxAltitude" float8
);

CREATE TABLE "WeatherStation" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "enabledState" boolean,
  "temperature" float8,
  "pressure" float8,
  "humidity" float8,
  "altitude" float8
);

CREATE TABLE "Subscription" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "weatherStationId" integer,
  "personId" integer
);

ALTER TABLE "Subscription" ADD FOREIGN KEY ("weatherStationId") REFERENCES "WeatherStation" ("id");

ALTER TABLE "Subscription" ADD FOREIGN KEY ("personId") REFERENCES "Person" ("id");
