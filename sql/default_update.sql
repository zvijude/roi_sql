-- ALTER TABLE "MainTask"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

-- ALTER TABLE "Qr"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

-- ALTER TABLE "Task"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

-- ALTER TABLE "Prob"
-- ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE "User"
ALTER COLUMN "updatedAt" SET DEFAULT now();


ALTER TABLE "Company"
ALTER COLUMN "updatedAt" SET DEFAULT now();

ALTER TABLE missing
ALTER COLUMN "updatedAt" SET DEFAULT now();

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now(); 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON missing
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
