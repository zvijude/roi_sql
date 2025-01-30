ALTER TABLE "Project"
ADD COLUMN "aptOpt" TEXT[];

UPDATE "Project"
SET "aptOpt" = ARRAY['מטבח', 'סלון', 'שירותים', 'ממד'];

ALTER TABLE "Project"
ALTER COLUMN "updatedAt" SET DEFAULT now();
