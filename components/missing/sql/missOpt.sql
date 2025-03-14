ALTER TABLE "Project"
ADD COLUMN "missOpt" TEXT[] DEFAULT '{}'::TEXT[];

ALTER TABLE "Project"
ALTER COLUMN "missOpt" SET DEFAULT ARRAY['זווית', 'איטום', 'בורג 6', 'מחסים'];


UPDATE "Project"
SET "missOpt" = ARRAY['זווית', 'איטום', 'בורג 6', 'מחסים']
WHERE "missOpt" IS NULL OR cardinality("missOpt") = 0;


SELECT * FROM "Project";