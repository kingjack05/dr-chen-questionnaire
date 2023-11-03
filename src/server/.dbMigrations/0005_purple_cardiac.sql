CREATE TABLE IF NOT EXISTS "bctResponse" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL,
	"q1" integer,
	"q2" integer,
	"q3" integer,
	"q4" integer,
	"q5" integer,
	"q6" integer,
	"q7" integer,
	"q8" integer,
	"q9" integer,
	"q10" integer,
	"q11" integer,
	"q12" integer,
	"q13" integer,
	"q14" integer,
	"q15" integer,
	"q16" integer,
	"q17" integer,
	"q18" integer,
	"q19" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bsrsResponse" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL,
	"q1" integer,
	"q2" integer,
	"q3" integer,
	"q4" integer,
	"q5" integer,
	"q6" integer,
	"q7" integer,
	"q8" integer,
	"q9" integer,
	"q10" integer,
	"q11" integer,
	"q12" integer,
	"q13" integer,
	"q14" integer,
	"q15" integer,
	"q16" integer,
	"q17" integer,
	"q18" integer,
	"q19" integer,
	"q20" integer,
	"q21" integer,
	"q22" integer,
	"q23" integer,
	"q24" integer,
	"q25" integer,
	"q26" integer,
	"q27" integer,
	"q28" integer,
	"q29" integer,
	"q30" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dashResponse" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL,
	"q1" integer,
	"q2" integer,
	"q3" integer,
	"q4" integer,
	"q5" integer,
	"q6" integer,
	"q7" integer,
	"q8" integer,
	"q9" integer,
	"q10" integer,
	"q11" integer,
	"q12" integer,
	"q13" integer,
	"q14" integer,
	"q15" integer,
	"q16" integer,
	"q17" integer,
	"q18" integer,
	"q19" integer,
	"q20" integer,
	"q21" integer,
	"q22" integer,
	"q23" integer,
	"q24" integer,
	"q25" integer,
	"q26" integer,
	"q27" integer,
	"q28" integer,
	"q29" integer,
	"q30" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qDashResponse" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sf12Response" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sf36Response" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL,
	"q1" integer,
	"q2" integer,
	"q3" integer,
	"q4" integer,
	"q5" integer,
	"q6" integer,
	"q7" integer,
	"q8" integer,
	"q9" integer,
	"q10" integer,
	"q11" integer,
	"q12" integer,
	"q13" integer,
	"q14" integer,
	"q15" integer,
	"q16" integer,
	"q17" integer,
	"q18" integer,
	"q19" integer,
	"q20" integer,
	"q21" integer,
	"q22" integer,
	"q23" integer,
	"q24" integer,
	"q25" integer,
	"q26" integer,
	"q27" integer,
	"q28" integer,
	"q29" integer,
	"q30" integer,
	"q31" integer,
	"q32" integer,
	"q33" integer,
	"q34" integer,
	"q35" integer,
	"q36" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "whoqolBrefResponse" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"patientId" integer NOT NULL,
	"q1" integer,
	"q2" integer,
	"q3" integer,
	"q4" integer,
	"q5" integer,
	"q6" integer,
	"q7" integer,
	"q8" integer,
	"q9" integer,
	"q10" integer,
	"q11" integer,
	"q12" integer,
	"q13" integer,
	"q14" integer,
	"q15" integer,
	"q16" integer,
	"q17" integer,
	"q18" integer,
	"q19" integer,
	"q20" integer,
	"q21" integer,
	"q22" integer,
	"q23" integer,
	"q24" integer,
	"q25" integer,
	"q26" integer,
	"q27" integer,
	"q28" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bctResponse" ADD CONSTRAINT "bctResponse_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bsrsResponse" ADD CONSTRAINT "bsrsResponse_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dashResponse" ADD CONSTRAINT "dashResponse_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qDashResponse" ADD CONSTRAINT "qDashResponse_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sf12Response" ADD CONSTRAINT "sf12Response_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sf36Response" ADD CONSTRAINT "sf36Response_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "whoqolBrefResponse" ADD CONSTRAINT "whoqolBrefResponse_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
