ALTER TABLE "Project"
ADD COLUMN "aptOpt" TEXT[] DEFAULT '{}'::TEXT[];

ALTER TABLE "Project"
ALTER COLUMN "aptOpt" SET DEFAULT ARRAY['מטבח', 'סלון', 'שירותים', 'ממד'];

ALTER TABLE "Project"
ALTER COLUMN "updatedAt" SET DEFAULT now();
