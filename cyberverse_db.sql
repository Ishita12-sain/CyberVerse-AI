--
-- PostgreSQL database dump
--

\restrict gKstulGRC3seGoD0D3lPa3Vax1kI7GU9qd8zmLR1GnM1W5Xi1uzIvXryxlT6v0r

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: learning_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_progress (
    progress_id integer NOT NULL,
    user_id integer NOT NULL,
    resource_id integer NOT NULL,
    status character varying(20) DEFAULT 'Not Started'::character varying,
    progress_percent integer DEFAULT 0,
    started_at timestamp without time zone,
    completed_at timestamp without time zone,
    CONSTRAINT valid_progress_percent CHECK (((progress_percent >= 0) AND (progress_percent <= 100))),
    CONSTRAINT valid_status CHECK (((status)::text = ANY ((ARRAY['Not Started'::character varying, 'In Progress'::character varying, 'Completed'::character varying])::text[])))
);


ALTER TABLE public.learning_progress OWNER TO postgres;

--
-- Name: learning_progress_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learning_progress_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.learning_progress_progress_id_seq OWNER TO postgres;

--
-- Name: learning_progress_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_progress_progress_id_seq OWNED BY public.learning_progress.progress_id;


--
-- Name: learning_resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_resources (
    resource_id integer NOT NULL,
    category_id integer,
    title character varying(200) NOT NULL,
    description text,
    resource_type character varying(50),
    resource_url text,
    difficulty character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.learning_resources OWNER TO postgres;

--
-- Name: learning_resources_resource_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learning_resources_resource_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.learning_resources_resource_id_seq OWNER TO postgres;

--
-- Name: learning_resources_resource_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_resources_resource_id_seq OWNED BY public.learning_resources.resource_id;


--
-- Name: quiz_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_answers (
    answer_id integer NOT NULL,
    attempt_id integer NOT NULL,
    question_id integer NOT NULL,
    selected_option_id integer,
    is_correct boolean DEFAULT false
);


ALTER TABLE public.quiz_answers OWNER TO postgres;

--
-- Name: quiz_answers_answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_answers_answer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_answers_answer_id_seq OWNER TO postgres;

--
-- Name: quiz_answers_answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_answers_answer_id_seq OWNED BY public.quiz_answers.answer_id;


--
-- Name: quiz_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_attempts (
    attempt_id integer NOT NULL,
    user_id integer NOT NULL,
    quiz_id integer NOT NULL,
    score integer DEFAULT 0,
    total_questions integer,
    started_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    completed_at timestamp without time zone
);


ALTER TABLE public.quiz_attempts OWNER TO postgres;

--
-- Name: quiz_attempts_attempt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_attempts_attempt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_attempts_attempt_id_seq OWNER TO postgres;

--
-- Name: quiz_attempts_attempt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_attempts_attempt_id_seq OWNED BY public.quiz_attempts.attempt_id;


--
-- Name: quiz_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_categories (
    category_id integer NOT NULL,
    category_name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.quiz_categories OWNER TO postgres;

--
-- Name: quiz_categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_categories_category_id_seq OWNER TO postgres;

--
-- Name: quiz_categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_categories_category_id_seq OWNED BY public.quiz_categories.category_id;


--
-- Name: quiz_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_options (
    option_id integer NOT NULL,
    question_id integer NOT NULL,
    option_text text NOT NULL,
    is_correct boolean DEFAULT false
);


ALTER TABLE public.quiz_options OWNER TO postgres;

--
-- Name: quiz_options_option_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_options_option_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_options_option_id_seq OWNER TO postgres;

--
-- Name: quiz_options_option_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_options_option_id_seq OWNED BY public.quiz_options.option_id;


--
-- Name: quiz_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_questions (
    question_id integer NOT NULL,
    quiz_id integer NOT NULL,
    question_text text NOT NULL,
    explanation text
);


ALTER TABLE public.quiz_questions OWNER TO postgres;

--
-- Name: quiz_questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_questions_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_questions_question_id_seq OWNER TO postgres;

--
-- Name: quiz_questions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_questions_question_id_seq OWNED BY public.quiz_questions.question_id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    quiz_id integer NOT NULL,
    category_id integer NOT NULL,
    quiz_title character varying(150) NOT NULL,
    description text,
    difficulty character varying(20) DEFAULT 'Beginner'::character varying,
    total_questions integer DEFAULT 0,
    time_limit_minutes integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quizzes_quiz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quizzes_quiz_id_seq OWNER TO postgres;

--
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quizzes_quiz_id_seq OWNED BY public.quizzes.quiz_id;


--
-- Name: threat_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.threat_reports (
    report_id integer NOT NULL,
    user_id integer,
    threat_type character varying(100) NOT NULL,
    description text NOT NULL,
    severity character varying(20) DEFAULT 'Medium'::character varying,
    status character varying(30) DEFAULT 'Pending'::character varying,
    reported_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.threat_reports OWNER TO postgres;

--
-- Name: threat_reports_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.threat_reports_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.threat_reports_report_id_seq OWNER TO postgres;

--
-- Name: threat_reports_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.threat_reports_report_id_seq OWNED BY public.threat_reports.report_id;


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_progress (
    progress_id integer NOT NULL,
    user_id integer NOT NULL,
    resource_id integer,
    quiz_id integer,
    progress_percentage integer DEFAULT 0,
    status character varying(30) DEFAULT 'Not Started'::character varying,
    last_accessed timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_progress OWNER TO postgres;

--
-- Name: user_progress_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_progress_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_progress_progress_id_seq OWNER TO postgres;

--
-- Name: user_progress_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_progress_progress_id_seq OWNED BY public.user_progress.progress_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    full_name character varying(100),
    role character varying(20) DEFAULT 'student'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: learning_progress progress_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_progress ALTER COLUMN progress_id SET DEFAULT nextval('public.learning_progress_progress_id_seq'::regclass);


--
-- Name: learning_resources resource_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_resources ALTER COLUMN resource_id SET DEFAULT nextval('public.learning_resources_resource_id_seq'::regclass);


--
-- Name: quiz_answers answer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answers ALTER COLUMN answer_id SET DEFAULT nextval('public.quiz_answers_answer_id_seq'::regclass);


--
-- Name: quiz_attempts attempt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts ALTER COLUMN attempt_id SET DEFAULT nextval('public.quiz_attempts_attempt_id_seq'::regclass);


--
-- Name: quiz_categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_categories ALTER COLUMN category_id SET DEFAULT nextval('public.quiz_categories_category_id_seq'::regclass);


--
-- Name: quiz_options option_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_options ALTER COLUMN option_id SET DEFAULT nextval('public.quiz_options_option_id_seq'::regclass);


--
-- Name: quiz_questions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_questions ALTER COLUMN question_id SET DEFAULT nextval('public.quiz_questions_question_id_seq'::regclass);


--
-- Name: quizzes quiz_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN quiz_id SET DEFAULT nextval('public.quizzes_quiz_id_seq'::regclass);


--
-- Name: threat_reports report_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threat_reports ALTER COLUMN report_id SET DEFAULT nextval('public.threat_reports_report_id_seq'::regclass);


--
-- Name: user_progress progress_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress ALTER COLUMN progress_id SET DEFAULT nextval('public.user_progress_progress_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: learning_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_progress (progress_id, user_id, resource_id, status, progress_percent, started_at, completed_at) FROM stdin;
1	1	1	In Progress	50	2026-08-09 17:18:57.537604	\N
\.


--
-- Data for Name: learning_resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_resources (resource_id, category_id, title, description, resource_type, resource_url, difficulty, created_at) FROM stdin;
1	1	Cybersecurity Basics Guide	Learn the basic concepts of cybersecurity, common risks, and how to stay protected online.	Guide	https://www.cisa.gov/topics/cyber-threats-and-advisories	Beginner	2026-08-09 16:44:40.511427
2	2	Networking Security Fundamentals	Understand network security, secure connections, firewalls, and basic network protection.	Guide	https://www.cisa.gov/topics/network-security	Beginner	2026-08-09 16:44:40.511427
3	3	Phishing and Social Engineering	Learn how phishing and social engineering attacks work and how to identify suspicious messages.	Article	https://www.cisa.gov/topics/cyber-threats-and-advisories/phishing	Beginner	2026-08-09 16:44:40.511427
4	4	Strong Password Security	Learn how to create strong passwords and protect your online accounts from unauthorized access.	Guide	https://www.cisa.gov/secure-our-world/use-strong-passwords	Beginner	2026-08-09 16:44:40.511427
5	5	Malware and Viruses	Understand malware, viruses, ransomware, and other malicious software and how to protect your devices.	Guide	https://www.cisa.gov/topics/malware	Intermediate	2026-08-09 16:44:40.511427
6	6	Web Security Fundamentals	Learn common web security risks and basic methods for keeping websites and web applications secure.	Guide	https://owasp.org/www-project-top-ten/	Intermediate	2026-08-09 16:44:40.511427
7	7	Ethical Hacking Basics	Learn the fundamentals of ethical hacking, security testing, and responsible vulnerability discovery.	Course	https://www.cisa.gov/resources-tools	Intermediate	2026-08-09 16:44:40.511427
8	8	Introduction to Cryptography	Understand encryption, decryption, keys, and how cryptography helps protect digital information.	Article	https://www.nist.gov/cryptography	Intermediate	2026-08-09 16:44:40.511427
9	9	Digital Privacy	Learn how to protect personal information, manage privacy settings, and reduce online tracking.	Guide	https://www.cisa.gov/topics/privacy	Beginner	2026-08-09 16:44:40.511427
10	10	Understanding Cyber Threats	Learn about common cyber threats and how attackers target individuals and organizations.	Guide	https://www.cisa.gov/topics/cyber-threats-and-advisories	Intermediate	2026-08-09 16:44:40.511427
11	11	Safe Internet Practices	Learn simple and practical habits for safer browsing, email use, downloads, and online accounts.	Guide	https://www.cisa.gov/secure-our-world	Beginner	2026-08-09 16:44:40.511427
12	12	Incident Response Basics	Learn what to do when a cybersecurity incident occurs and understand the basic incident response process.	Guide	https://www.cisa.gov/topics/cyber-threats-and-advisories	Advanced	2026-08-09 16:44:40.511427
13	1	Cybersecurity Basics Guide	Learn the basic concepts of cybersecurity, common risks, and how to stay protected online.	Guide	https://www.cisa.gov/topics/cyber-threats-and-advisories	Beginner	2026-08-09 16:44:51.819163
14	2	Networking Security Fundamentals	Understand network security, secure connections, firewalls, and basic network protection.	Guide	https://www.cisa.gov/topics/network-security	Beginner	2026-08-09 16:44:51.819163
15	3	Phishing and Social Engineering	Learn how phishing and social engineering attacks work and how to identify suspicious messages.	Article	https://www.cisa.gov/topics/cyber-threats-and-advisories/phishing	Beginner	2026-08-09 16:44:51.819163
16	4	Strong Password Security	Learn how to create strong passwords and protect your online accounts from unauthorized access.	Guide	https://www.cisa.gov/secure-our-world/use-strong-passwords	Beginner	2026-08-09 16:44:51.819163
17	5	Malware and Viruses	Understand malware, viruses, ransomware, and other malicious software and how to protect your devices.	Guide	https://www.cisa.gov/topics/malware	Intermediate	2026-08-09 16:44:51.819163
18	6	Web Security Fundamentals	Learn common web security risks and basic methods for keeping websites and web applications secure.	Guide	https://owasp.org/www-project-top-ten/	Intermediate	2026-08-09 16:44:51.819163
19	7	Ethical Hacking Basics	Learn the fundamentals of ethical hacking, security testing, and responsible vulnerability discovery.	Course	https://www.cisa.gov/resources-tools	Intermediate	2026-08-09 16:44:51.819163
20	8	Introduction to Cryptography	Understand encryption, decryption, keys, and how cryptography helps protect digital information.	Article	https://www.nist.gov/cryptography	Intermediate	2026-08-09 16:44:51.819163
21	9	Digital Privacy	Learn how to protect personal information, manage privacy settings, and reduce online tracking.	Guide	https://www.cisa.gov/topics/privacy	Beginner	2026-08-09 16:44:51.819163
22	10	Understanding Cyber Threats	Learn about common cyber threats and how attackers target individuals and organizations.	Guide	https://www.cisa.gov/topics/cyber-threats-and-advisories	Intermediate	2026-08-09 16:44:51.819163
23	11	Safe Internet Practices	Learn simple and practical habits for safer browsing, email use, downloads, and online accounts.	Guide	https://www.cisa.gov/secure-our-world	Beginner	2026-08-09 16:44:51.819163
24	12	Incident Response Basics	Learn what to do when a cybersecurity incident occurs and understand the basic incident response process.	Guide	https://www.cisa.gov/topics/cyber-threats-and-advisories	Advanced	2026-08-09 16:44:51.819163
\.


--
-- Data for Name: quiz_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_answers (answer_id, attempt_id, question_id, selected_option_id, is_correct) FROM stdin;
\.


--
-- Data for Name: quiz_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_attempts (attempt_id, user_id, quiz_id, score, total_questions, started_at, completed_at) FROM stdin;
\.


--
-- Data for Name: quiz_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_categories (category_id, category_name, description) FROM stdin;
1	Cybersecurity Basics	Basic concepts of cybersecurity
2	Networking Security	Network security and protection
3	Phishing & Social Engineering	Phishing attacks and social engineering awareness
4	Password Security	Strong passwords and authentication
5	Malware & Viruses	Malware, viruses, worms and trojans
6	Web Security	Web application security and common attacks
7	Ethical Hacking	Ethical hacking and penetration testing concepts
8	Cryptography	Encryption, hashing and cryptographic concepts
9	Digital Privacy	Online privacy and personal data protection
10	Cyber Threats	Common cyber threats and attack techniques
11	Safe Internet Practices	Safe browsing and internet habits
12	Incident Response	Cybersecurity incident detection and response
\.


--
-- Data for Name: quiz_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_options (option_id, question_id, option_text, is_correct) FROM stdin;
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_questions (question_id, quiz_id, question_text, explanation) FROM stdin;
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (quiz_id, category_id, quiz_title, description, difficulty, total_questions, time_limit_minutes, created_at) FROM stdin;
\.


--
-- Data for Name: threat_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.threat_reports (report_id, user_id, threat_type, description, severity, status, reported_at) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_progress (progress_id, user_id, resource_id, quiz_id, progress_percentage, status, last_accessed) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password_hash, full_name, role, created_at) FROM stdin;
1	testuser	test@example.com	temporary_hash	\N	student	2026-08-09 17:18:08.257883
\.


--
-- Name: learning_progress_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_progress_progress_id_seq', 1, true);


--
-- Name: learning_resources_resource_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_resources_resource_id_seq', 24, true);


--
-- Name: quiz_answers_answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_answers_answer_id_seq', 1, false);


--
-- Name: quiz_attempts_attempt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_attempts_attempt_id_seq', 1, false);


--
-- Name: quiz_categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_categories_category_id_seq', 12, true);


--
-- Name: quiz_options_option_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_options_option_id_seq', 1, false);


--
-- Name: quiz_questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_questions_question_id_seq', 1, false);


--
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quizzes_quiz_id_seq', 1, false);


--
-- Name: threat_reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.threat_reports_report_id_seq', 1, false);


--
-- Name: user_progress_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_progress_progress_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: learning_progress learning_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_progress
    ADD CONSTRAINT learning_progress_pkey PRIMARY KEY (progress_id);


--
-- Name: learning_resources learning_resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_resources
    ADD CONSTRAINT learning_resources_pkey PRIMARY KEY (resource_id);


--
-- Name: quiz_answers quiz_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_pkey PRIMARY KEY (answer_id);


--
-- Name: quiz_attempts quiz_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_pkey PRIMARY KEY (attempt_id);


--
-- Name: quiz_categories quiz_categories_category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_categories
    ADD CONSTRAINT quiz_categories_category_name_key UNIQUE (category_name);


--
-- Name: quiz_categories quiz_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_categories
    ADD CONSTRAINT quiz_categories_pkey PRIMARY KEY (category_id);


--
-- Name: quiz_options quiz_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_options
    ADD CONSTRAINT quiz_options_pkey PRIMARY KEY (option_id);


--
-- Name: quiz_questions quiz_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_pkey PRIMARY KEY (question_id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quiz_id);


--
-- Name: threat_reports threat_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threat_reports
    ADD CONSTRAINT threat_reports_pkey PRIMARY KEY (report_id);


--
-- Name: learning_progress unique_user_resource; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_progress
    ADD CONSTRAINT unique_user_resource UNIQUE (user_id, resource_id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (progress_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: quiz_answers fk_answer_attempt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT fk_answer_attempt FOREIGN KEY (attempt_id) REFERENCES public.quiz_attempts(attempt_id) ON DELETE CASCADE;


--
-- Name: quiz_answers fk_answer_option; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT fk_answer_option FOREIGN KEY (selected_option_id) REFERENCES public.quiz_options(option_id) ON DELETE SET NULL;


--
-- Name: quiz_answers fk_answer_question; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES public.quiz_questions(question_id) ON DELETE CASCADE;


--
-- Name: quiz_attempts fk_attempt_quiz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT fk_attempt_quiz FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id) ON DELETE CASCADE;


--
-- Name: quiz_attempts fk_attempt_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT fk_attempt_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: quiz_options fk_option_question; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_options
    ADD CONSTRAINT fk_option_question FOREIGN KEY (question_id) REFERENCES public.quiz_questions(question_id) ON DELETE CASCADE;


--
-- Name: user_progress fk_progress_quiz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT fk_progress_quiz FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id) ON DELETE SET NULL;


--
-- Name: learning_progress fk_progress_resource; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_progress
    ADD CONSTRAINT fk_progress_resource FOREIGN KEY (resource_id) REFERENCES public.learning_resources(resource_id) ON DELETE CASCADE;


--
-- Name: user_progress fk_progress_resource; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT fk_progress_resource FOREIGN KEY (resource_id) REFERENCES public.learning_resources(resource_id) ON DELETE SET NULL;


--
-- Name: learning_progress fk_progress_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_progress
    ADD CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: user_progress fk_progress_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: quiz_questions fk_question_quiz; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT fk_question_quiz FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id) ON DELETE CASCADE;


--
-- Name: quizzes fk_quiz_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT fk_quiz_category FOREIGN KEY (category_id) REFERENCES public.quiz_categories(category_id) ON DELETE CASCADE;


--
-- Name: threat_reports fk_report_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threat_reports
    ADD CONSTRAINT fk_report_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: learning_resources fk_resource_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_resources
    ADD CONSTRAINT fk_resource_category FOREIGN KEY (category_id) REFERENCES public.quiz_categories(category_id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict gKstulGRC3seGoD0D3lPa3Vax1kI7GU9qd8zmLR1GnM1W5Xi1uzIvXryxlT6v0r

