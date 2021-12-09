
UPDATE "Person"
SET "isAdmin" = false
WHERE "isAdmin" IS NULL;

UPDATE "Person"
SET "firstName" = 'First'
WHERE "firstName" IS NULL;

UPDATE "Person"
SET "lastName" = 'Last'
WHERE "lastName" IS NULL;

UPDATE "Person"
SET "intervalNotificationsEnabled" = true
WHERE "intervalNotificationsEnabled" IS NULL;

UPDATE "Person"
SET "alarmNotificationsEnabled" = true
WHERE "alarmNotificationsEnabled" IS NULL;

UPDATE "Person"
SET "timeInterval" = 4
WHERE "timeInterval" IS NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "email" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "hashedPassword" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "isAdmin" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "firstName" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "lastName" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "intervalNotificationsEnabled" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "alarmNotificationsEnabled" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "timeInterval" SET NOT NULL;

ALTER TABLE public."Person"
    ADD COLUMN "arePreferencesSet" boolean;

UPDATE "Person"
SET "arePreferencesSet" = false
WHERE "arePreferencesSet" IS NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "arePreferencesSet" SET NOT NULL;

ALTER TABLE public."Person"
    ALTER COLUMN "timeInterval" TYPE smallint USING "timeInterval"::smallint;