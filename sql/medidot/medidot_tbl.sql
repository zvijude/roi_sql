CREATE TABLE medidot (
  "id" SERIAL PRIMARY KEY,
  "qrId" INT NOT NULL REFERENCES "Qr" ("id") ON DELETE CASCADE,
  "item" TEXT NOT NULL,
  "width" INT,
  "height" INT,
  "depth" INT,
  "media" TEXT,
  "note" TEXT,
  "isActive" BOOLEAN DEFAULT TRUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "createdById" INT REFERENCES "User"("id") ON DELETE SET NULL,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   "resAt" TIMESTAMP,
  "updatedById" INT REFERENCES "User"("id") ON DELETE SET NULL
);

-- DROP TABLE IF EXISTS medidot;