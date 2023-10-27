ALTER TABLE "patient" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "patient" ALTER COLUMN "birthday" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "patient" ALTER COLUMN "lastEdited" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "patient" ADD COLUMN "files" json[];