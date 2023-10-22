CREATE TABLE IF NOT EXISTS "michiganHandOutcome" (
	"id" serial PRIMARY KEY NOT NULL,
	"patientId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient" (
	"id" integer,
	"name" text,
	"birthday" date,
	"diagnoses" json,
	"followingQuestionnaires" json,
	CONSTRAINT "patient_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "michiganHandOutcome" ADD CONSTRAINT "michiganHandOutcome_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
