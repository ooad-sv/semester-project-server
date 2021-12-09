ALTER TABLE public."WeatherStation"
    ALTER COLUMN altitude SET NOT NULL;

ALTER TABLE public."WeatherStation"
    ALTER COLUMN humidity SET NOT NULL;

ALTER TABLE public."WeatherStation"
    ALTER COLUMN pressure SET NOT NULL;

ALTER TABLE public."WeatherStation"
    ALTER COLUMN "enabledState" SET NOT NULL;

ALTER TABLE public."WeatherStation"
    ALTER COLUMN temperature SET NOT NULL;

ALTER TABLE public."WeatherStation"
    ADD COLUMN name character varying NOT NULL;

ALTER TABLE public."WeatherStation"
    ADD COLUMN key character varying NOT NULL;

ALTER TABLE public."WeatherStation"
    ADD CONSTRAINT "WeatherStation_key_key" UNIQUE (key);

INSERT INTO public."WeatherStation" ("enabledState", "temperature", "pressure", "humidity", "altitude", "name", "key") VALUES (true, 1, 1, 1, 1, 'Weather Station 1', 'gekpeiakemwnrjhlckmimicinuocbkgc');
INSERT INTO public."WeatherStation" ("enabledState", "temperature", "pressure", "humidity", "altitude", "name", "key") VALUES (true, 1, 1, 1, 1, 'Weather Station 2', 'kkztpimkpbsyauczeekmnrgkyopnbpws');
INSERT INTO public."WeatherStation" ("enabledState", "temperature", "pressure", "humidity", "altitude", "name", "key") VALUES (true, 1, 1, 1, 1, 'Weather Station 3', 'lpjvpcrhqbgumkarsxkwrpkmvdvwjkaj');
INSERT INTO public."WeatherStation" ("enabledState", "temperature", "pressure", "humidity", "altitude", "name", "key") VALUES (true, 1, 1, 1, 1, 'Weather Station 4', 'kxovumoysaslqalizjapnbkhvmhunrdd');