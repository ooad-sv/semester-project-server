--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.0

-- Started on 2021-12-08 23:49:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4009 (class 1262 OID 2605218)
-- Name: dd39tvppugdkne; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE dd39tvppugdkne WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';


\connect dd39tvppugdkne

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 2606405)
-- Name: Person; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Person" (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    email character varying NOT NULL,
    "hashedPassword" character varying NOT NULL,
    "isAdmin" boolean NOT NULL,
    "intervalNotificationsEnabled" boolean NOT NULL,
    "timeInterval" smallint NOT NULL,
    "alarmNotificationsEnabled" boolean NOT NULL,
    "minTemperature" double precision,
    "maxTemperature" double precision,
    "minPressure" double precision,
    "maxPressure" double precision,
    "minHumidity" double precision,
    "maxHumidity" double precision,
    "minAltitude" double precision,
    "maxAltitude" double precision,
    "arePreferencesSet" boolean NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 2606403)
-- Name: Person_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Person_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4010 (class 0 OID 0)
-- Dependencies: 200
-- Name: Person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Person_id_seq" OWNED BY public."Person".id;


--
-- TOC entry 205 (class 1259 OID 2606426)
-- Name: Subscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Subscription" (
    id integer NOT NULL,
    "weatherStationId" integer,
    "personId" integer
);


--
-- TOC entry 204 (class 1259 OID 2606424)
-- Name: Subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Subscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4011 (class 0 OID 0)
-- Dependencies: 204
-- Name: Subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Subscription_id_seq" OWNED BY public."Subscription".id;


--
-- TOC entry 203 (class 1259 OID 2606418)
-- Name: WeatherStation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."WeatherStation" (
    id integer NOT NULL,
    "enabledState" boolean NOT NULL,
    temperature double precision NOT NULL,
    pressure double precision NOT NULL,
    humidity double precision NOT NULL,
    altitude double precision NOT NULL,
    name character varying NOT NULL,
    key character varying NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 2606416)
-- Name: WeatherStation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."WeatherStation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4012 (class 0 OID 0)
-- Dependencies: 202
-- Name: WeatherStation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."WeatherStation_id_seq" OWNED BY public."WeatherStation".id;


--
-- TOC entry 3851 (class 2604 OID 2606408)
-- Name: Person id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Person" ALTER COLUMN id SET DEFAULT nextval('public."Person_id_seq"'::regclass);


--
-- TOC entry 3853 (class 2604 OID 2606429)
-- Name: Subscription id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription" ALTER COLUMN id SET DEFAULT nextval('public."Subscription_id_seq"'::regclass);


--
-- TOC entry 3852 (class 2604 OID 2606421)
-- Name: WeatherStation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WeatherStation" ALTER COLUMN id SET DEFAULT nextval('public."WeatherStation_id_seq"'::regclass);


--
-- TOC entry 3999 (class 0 OID 2606405)
-- Dependencies: 201
-- Data for Name: Person; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (2, 'Sagar', 'Pathare', 'sagar.pathare@colorado.edu', '$2b$10$NOWnvERijP/uHFAsbuQxSuBSOb867E7rgdiC8D59991f0Ep3oCN8y', false, true, 1, true, 0, 40, 0, 200000, 0, 30, 1000, 2000, true);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (7, 'A', 'B', 'ab@ab.com', '$2b$10$Ep2IcEc02ASXbFo1hPvSWurNSXZabfKRAEowX3OTgJFuq46FFE0vW', false, true, 4, true, 16, 35, 50000, 150000, 10, 65, 1000, 2000, true);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (6, 'X', 'Y', 'xy@z.com', '$2b$10$VknQwAiNrbIpLirpFjm1SOqvzDgR3G44Q6Et1SGNzTI0jErm9MQ2C', false, false, 4, false, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (3, 'Vimal', 'Kakaraparthi', 'vimalkakaraparti@gmail.com', '$2b$10$yHbLvut3Z4l/8bTEV8hz8uI0WmUQapxG9zLqw0vL4UrKIf1ZjRYLe', false, true, 4, false, 0, 40, 0, 200000, 0, 30, 1000, 2000, true);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (8, 'Alex2', 'Brown', 'alex@brown.com', '$2b$10$kfgHdCAIwtIqjskz0yass.KnQrIWDlmsCq0bRz8ZTp0Gr2VIb5zOS', false, false, 2, true, 16, 35, 50000, 150000, 10, 65, 1000, 2000, true);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (9, 'Alex', 'Green', 'alex@green.com', '$2b$10$VxITgiJN.1caD0YPsS0Ot.WEZlsTriVj80b3IedCMnVL.OVaQqAMS', false, true, 4, true, 16, 35, 50000, 150000, 10, 65, 1000, 2000, true);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (1, 'Admin', 'Last', 'a@b.com', '$2b$10$2t4mXoHMI11E27ps8Y3pf.a9RjP6nT4wbqdKqoz7VmpSDrLC/xqKG', true, false, 4, false, 0, 40, 0, 200000, 0, 30, 1000, 2000, true);
INSERT INTO public."Person" (id, "firstName", "lastName", email, "hashedPassword", "isAdmin", "intervalNotificationsEnabled", "timeInterval", "alarmNotificationsEnabled", "minTemperature", "maxTemperature", "minPressure", "maxPressure", "minHumidity", "maxHumidity", "minAltitude", "maxAltitude", "arePreferencesSet") VALUES (5, 'Sagar2', 'Pathare', 'sagar.pathare+1@colorado.edu', '$2b$10$PGweU7kAWJ7/7pbiDt0ZFOqAcDOUZodBHs3ojojVtf6rXbU28mAXy', false, true, 1, true, 0, 40, 0, 200000, 0, 30, 1000, 2000, true);


--
-- TOC entry 4003 (class 0 OID 2606426)
-- Dependencies: 205
-- Data for Name: Subscription; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (88, 1, 2);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (89, 2, 2);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (90, 3, 2);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (91, 4, 2);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (92, 1, 7);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (93, 2, 7);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (30, 1, 1);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (31, 2, 1);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (32, 3, 1);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (33, 4, 1);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (94, 3, 7);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (95, 4, 7);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (106, 4, 3);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (54, 2, 5);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (55, 3, 5);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (117, 1, 8);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (118, 2, 8);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (119, 3, 8);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (120, 4, 8);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (121, 1, 9);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (122, 2, 9);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (123, 3, 9);
INSERT INTO public."Subscription" (id, "weatherStationId", "personId") VALUES (124, 4, 9);


--
-- TOC entry 4001 (class 0 OID 2606418)
-- Dependencies: 203
-- Data for Name: WeatherStation; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."WeatherStation" (id, "enabledState", temperature, pressure, humidity, altitude, name, key) VALUES (4, true, 25.3, 82340, 92.4, 1716.1, 'Weather Station 4', 'kxovumoysaslqalizjapnbkhvmhunrdd');
INSERT INTO public."WeatherStation" (id, "enabledState", temperature, pressure, humidity, altitude, name, key) VALUES (1, true, 23.9, 83019, 20.1, 1649.5, 'Weather Station 1', 'gekpeiakemwnrjhlckmimicinuocbkgc');
INSERT INTO public."WeatherStation" (id, "enabledState", temperature, pressure, humidity, altitude, name, key) VALUES (3, true, 22.1, 82277, 22.2, 1722.3, 'Weather Station 3', 'lpjvpcrhqbgumkarsxkwrpkmvdvwjkaj');
INSERT INTO public."WeatherStation" (id, "enabledState", temperature, pressure, humidity, altitude, name, key) VALUES (2, false, 22.3, 82400, 22.3, 1710.2, 'Weather Station 2', 'kkztpimkpbsyauczeekmnrgkyopnbpws');


--
-- TOC entry 4013 (class 0 OID 0)
-- Dependencies: 200
-- Name: Person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Person_id_seq"', 9, true);


--
-- TOC entry 4014 (class 0 OID 0)
-- Dependencies: 204
-- Name: Subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Subscription_id_seq"', 124, true);


--
-- TOC entry 4015 (class 0 OID 0)
-- Dependencies: 202
-- Name: WeatherStation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."WeatherStation_id_seq"', 4, true);


--
-- TOC entry 3855 (class 2606 OID 2606415)
-- Name: Person Person_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT "Person_email_key" UNIQUE (email);


--
-- TOC entry 3857 (class 2606 OID 2606413)
-- Name: Person Person_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Person"
    ADD CONSTRAINT "Person_pkey" PRIMARY KEY (id);


--
-- TOC entry 3863 (class 2606 OID 2606431)
-- Name: Subscription Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);


--
-- TOC entry 3865 (class 2606 OID 2692666)
-- Name: Subscription Subscription_station_person_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_station_person_key" UNIQUE ("weatherStationId", "personId");


--
-- TOC entry 3859 (class 2606 OID 2684236)
-- Name: WeatherStation WeatherStation_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WeatherStation"
    ADD CONSTRAINT "WeatherStation_key_key" UNIQUE (key);


--
-- TOC entry 3861 (class 2606 OID 2606423)
-- Name: WeatherStation WeatherStation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WeatherStation"
    ADD CONSTRAINT "WeatherStation_pkey" PRIMARY KEY (id);


--
-- TOC entry 3867 (class 2606 OID 2606437)
-- Name: Subscription Subscription_personId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_personId_fkey" FOREIGN KEY ("personId") REFERENCES public."Person"(id);


--
-- TOC entry 3866 (class 2606 OID 2606432)
-- Name: Subscription Subscription_weatherStationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_weatherStationId_fkey" FOREIGN KEY ("weatherStationId") REFERENCES public."WeatherStation"(id);


-- Completed on 2021-12-08 23:49:47

--
-- PostgreSQL database dump complete
--

