CREATE TABLE missing (
  "id" SERIAL PRIMARY KEY,
  "qrId" INT NOT NULL REFERENCES "Qr" ("id") ON DELETE CASCADE,
  "item" TEXT NOT NULL,
  "qntt" INT NOT NULL,
  "isActive" BOOLEAN DEFAULT TRUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "createdById" INT REFERENCES "User"("id") ON DELETE SET NULL,
  "updatedById" INT REFERENCES "User"("id") ON DELETE SET NULL
);
