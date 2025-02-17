ALTER TABLE "Project"
ADD COLUMN "measureOpt" TEXT[] DEFAULT '{}'::TEXT[];

UPDATE "Project"
SET "measureOpt" = ARRAY['זווית', 'פח איטום', 'זכוכית א1']
WHERE "measureOpt" IS NULL OR cardinality("measureOpt") = 0;


SELECT * FROM "Project";