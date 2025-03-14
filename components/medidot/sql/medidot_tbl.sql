CREATE TABLE medidot (
  "id" SERIAL PRIMARY KEY,
  "qrId" INT REFERENCES "Qr" ("id") ON DELETE CASCADE,
  "partId" INT REFERENCES "Part" ("id") ON DELETE CASCADE,
  "prjId" INT NOT NULL REFERENCES "Project" ("id") ON DELETE CASCADE,
  "isActive" BOOLEAN DEFAULT TRUE,
  "item" TEXT NOT NULL,
  "width" INT,
  "height" INT,
  "depth" INT,
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
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "resAt" TIMESTAMP,
    "updatedById" INT REFERENCES "User"("id") ON DELETE
  SET NULL
);
-- DROP TABLE IF EXISTS medidot;
-- SELECT * FROM medidot;