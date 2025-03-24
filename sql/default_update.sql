-- ALTER TABLE "MainTask"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

-- ALTER TABLE "Qr"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

-- ALTER TABLE "Task"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

-- ALTER TABLE "Prob"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE "Part"
ALTER COLUMN "updatedAt" SET DEFAULT now();


ALTER TABLE "Company"
ALTER COLUMN "updatedAt" SET DEFAULT now();

-- THE FUNCTION
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now(); 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- THE TRIGGER
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Part"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();


ALTER TABLE missing
ALTER COLUMN "updatedAt" SET DEFAULT now();