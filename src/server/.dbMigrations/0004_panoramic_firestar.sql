ALTER TABLE "michiganHandOutcomeResponse" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ALTER COLUMN "patientId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ADD COLUMN "handedness" integer;--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ADD COLUMN "affectedSide" integer;--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ADD COLUMN "changedJob" integer;--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ADD COLUMN "previousJob" text;--> statement-breakpoint
ALTER TABLE "michiganHandOutcomeResponse" ADD COLUMN "currentJob" text;