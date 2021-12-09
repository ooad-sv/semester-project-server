ALTER TABLE public."Subscription"
    ADD CONSTRAINT "Subscription_station_person_key" UNIQUE ("weatherStationId", "personId");