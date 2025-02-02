ALTER TABLE "User" ADD COLUMN     "name" TEXT GENERATED ALWAYS AS ("firstName" || ' ' || "lastName") STORED;

ALTER TABLE "User" DROP COLUMN "name";
