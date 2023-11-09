CREATE TABLE IF NOT EXISTS "AINData" (
	"id" serial PRIMARY KEY NOT NULL,
	"patientId" integer NOT NULL,
	"postOPMonth" integer,
	"group" integer,
	"palsySide" text,
	"aDMcMAP" numeric,
	"fDIcMAP" numeric,
	"SNAP" numeric,
	"postMed" numeric,
	"2PDSmall" numeric,
	"2PDRing" numeric,
	"2PDNormal" numeric,
	"gripIH" numeric,
	"pinchIH" numeric,
	"fdi" numeric,
	"digAbd" numeric,
	"raAdd" numeric,
	"uiAdd" numeric,
	"froment" integer,
	"clawing" integer,
	"wart" integer,
	"intPlus" integer,
	"bsrs" numeric,
	"sf36" numeric,
	"dash" numeric
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AINData" ADD CONSTRAINT "AINData_patientId_patient_id_fk" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bctResponse" ADD CONSTRAINT "bctResponse_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "bsrsResponse" ADD CONSTRAINT "bsrsResponse_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "dashResponse" ADD CONSTRAINT "dashResponse_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ADD CONSTRAINT "michiganHandOutcomeResponse_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "qDashResponse" ADD CONSTRAINT "qDashResponse_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "sf12Response" ADD CONSTRAINT "sf12Response_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "sf36Response" ADD CONSTRAINT "sf36Response_patientId_date_unique" UNIQUE("patientId","date");--> statement-breakpoint
ALTER TABLE "whoqolBrefResponse" ADD CONSTRAINT "whoqolBrefResponse_patientId_date_unique" UNIQUE("patientId","date");