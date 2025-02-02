ALTER TABLE "Qr"
ADD COLUMN "loc" TEXT GENERATED ALWAYS AS (
  'קומה ' || "floor" || ', דירה ' || "aptNum" || 
  ', ' || "locInApt" || 
  CASE 
    WHEN "front" IS NOT NULL AND "front" <> '' THEN ', חזית ' || "front" 
    ELSE '' 
  END
) STORED;
