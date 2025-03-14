CREATE TABLE missing (
  "id" SERIAL PRIMARY KEY,
  "qrId" INT REFERENCES "Qr" ("id") ON DELETE CASCADE,
  "partId" INT REFERENCES "Part" ("id") ON DELETE CASCADE,
  "prjId" INT NOT NULL REFERENCES "Project" ("id") ON DELETE CASCADE,
  "item" TEXT NOT NULL,
  "qntt" INT NOT NULL,
  "isActive" BOOLEAN DEFAULT TRUE,
  "media" TEXT,
  "note" TEXT,
  "floor" INT,
  "aptNum" TEXT,
  "front" TEXT,
  "locInApt" TEXT,
  "loc" TEXT GENERATED ALWAYS AS (
    'קומה ' || "floor" || ', דירה ' || "aptNum" || ', ' || "locInApt" || CASE
      WHEN "front" IS NOT NULL
      AND "front" <> '' THEN ', חזית ' || "front"
      ELSE ''
    END
  ) STORED,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "createdById" INT REFERENCES "User"("id") ON DELETE
  SET NULL,
    "resAt" TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedById" INT REFERENCES "User"("id") ON DELETE
  SET NULL
);
-- DROP TABLE IF EXISTS missing;