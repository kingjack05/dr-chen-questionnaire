CREATE TABLE IF NOT EXISTS "michiganHandOutcome" (
	"id" serial PRIMARY KEY NOT NULL,
	"patientId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text,
	"gender" text,
	"birthday" date,
	"diagnoses" text[],
	"followingQuestionnaires" text[],
	"lastEdited" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nameIdx" ON "patient" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "lastEditedIdx" ON "patient" ("lastEdited");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "michiganHandOutcome" ADD CONSTRAINT "michiganHandOutcome_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
