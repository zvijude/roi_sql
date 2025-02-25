
ALTER TABLE "Project"
ADD COLUMN "midot_opt" TEXT[] DEFAULT '{}'::TEXT[];

ALTER TABLE "Project"
ALTER COLUMN "midot_opt" SET DEFAULT ARRAY['זווית', 'פח איטום', 'זכוכית א1'];

ALTER TABLE "Project"
ALTER COLUMN "updatedAt" SET DEFAULT now();
