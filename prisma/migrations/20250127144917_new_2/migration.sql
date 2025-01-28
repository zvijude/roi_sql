/*
  Warnings:

  - You are about to drop the column `media` on the `MainTask` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Prob` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Prob` table. All the data in the column will be lost.
  - You are about to drop the column `qrId` on the `Prob` table. All the data in the column will be lost.
  - You are about to drop the column `curTaskId` on the `Qr` table. All the data in the column will be lost.
  - You are about to drop the column `curTaskQrId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `for` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `isMedia` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `needApproval` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AptOpt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BgtReq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompletedTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Msg` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkippedTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaitingTask` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `price` on table `MainTask` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `type` on the `Prob` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `prjId` on table `Prob` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `createdById` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `prjId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProbType" AS ENUM ('PROB', 'BGT_REQ');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProbStatus" ADD VALUE 'DENIED';
ALTER TYPE "ProbStatus" ADD VALUE 'GRANTED';

-- DropForeignKey
ALTER TABLE "AptOpt" DROP CONSTRAINT "AptOpt_projectId_fkey";

-- DropForeignKey
ALTER TABLE "BgtReq" DROP CONSTRAINT "BgtReq_createdById_fkey";

-- DropForeignKey
ALTER TABLE "BgtReq" DROP CONSTRAINT "BgtReq_prjId_fkey";

-- DropForeignKey
ALTER TABLE "BgtReq" DROP CONSTRAINT "BgtReq_qrId_fkey";

-- DropForeignKey
ALTER TABLE "BgtReq" DROP CONSTRAINT "BgtReq_resById_fkey";

-- DropForeignKey
ALTER TABLE "BgtReq" DROP CONSTRAINT "BgtReq_taskId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTask" DROP CONSTRAINT "CompletedTask_createdById_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTask" DROP CONSTRAINT "CompletedTask_prjId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTask" DROP CONSTRAINT "CompletedTask_qrId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTask" DROP CONSTRAINT "CompletedTask_resById_fkey";

-- DropForeignKey
ALTER TABLE "CompletedTask" DROP CONSTRAINT "CompletedTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Msg" DROP CONSTRAINT "Msg_breqId_fkey";

-- DropForeignKey
ALTER TABLE "Msg" DROP CONSTRAINT "Msg_probId_fkey";

-- DropForeignKey
ALTER TABLE "Msg" DROP CONSTRAINT "Msg_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_msgId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Prob" DROP CONSTRAINT "Prob_prjId_fkey";

-- DropForeignKey
ALTER TABLE "Prob" DROP CONSTRAINT "Prob_qrId_fkey";

-- DropForeignKey
ALTER TABLE "Qr" DROP CONSTRAINT "Qr_curTaskId_fkey";

-- DropForeignKey
ALTER TABLE "SkippedTask" DROP CONSTRAINT "SkippedTask_createdById_fkey";

-- DropForeignKey
ALTER TABLE "SkippedTask" DROP CONSTRAINT "SkippedTask_prjId_fkey";

-- DropForeignKey
ALTER TABLE "SkippedTask" DROP CONSTRAINT "SkippedTask_qrId_fkey";

-- DropForeignKey
ALTER TABLE "SkippedTask" DROP CONSTRAINT "SkippedTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_prjId_fkey";

-- DropForeignKey
ALTER TABLE "WaitingTask" DROP CONSTRAINT "WaitingTask_createdById_fkey";

-- DropForeignKey
ALTER TABLE "WaitingTask" DROP CONSTRAINT "WaitingTask_prjId_fkey";

-- DropForeignKey
ALTER TABLE "WaitingTask" DROP CONSTRAINT "WaitingTask_qrId_fkey";

-- DropForeignKey
ALTER TABLE "WaitingTask" DROP CONSTRAINT "WaitingTask_taskId_fkey";

-- DropIndex
DROP INDEX "Qr_curTaskId_key";

-- AlterTable
ALTER TABLE "MainTask" DROP COLUMN "media",
ADD COLUMN     "needMedia" BOOLEAN DEFAULT false,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Prob" DROP COLUMN "date",
DROP COLUMN "duration",
DROP COLUMN "qrId",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "type",
ADD COLUMN     "type" "ProbType" NOT NULL,
ALTER COLUMN "prjId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "aptOpts" TEXT[];

-- AlterTable
ALTER TABLE "Qr" DROP COLUMN "curTaskId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "curTaskQrId",
DROP COLUMN "desc",
DROP COLUMN "for",
DROP COLUMN "isMedia",
DROP COLUMN "needApproval",
DROP COLUMN "order",
DROP COLUMN "price",
DROP COLUMN "title",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "resById" INTEGER,
ALTER COLUMN "prjId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "otp";

-- DropTable
DROP TABLE "AptOpt";

-- DropTable
DROP TABLE "BgtReq";

-- DropTable
DROP TABLE "CompletedTask";

-- DropTable
DROP TABLE "Msg";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "SkippedTask";

-- DropTable
DROP TABLE "WaitingTask";

-- DropEnum
DROP TYPE "BgtReqStatus";

-- DropEnum
DROP TYPE "EventType";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_resById_fkey" FOREIGN KEY ("resById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prob" ADD CONSTRAINT "Prob_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
