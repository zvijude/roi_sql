-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PROB', 'BGT_REQ', 'COMPLETED', 'WAITING', 'SKIPPED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('WAITING', 'SKIPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ProbStatus" AS ENUM ('WAITING', 'SOLVED', 'CANCELED');

-- CreateEnum
CREATE TYPE "BgtReqStatus" AS ENUM ('WAITING', 'GRANTED', 'DENIED', 'CANCELED');

-- CreateEnum
CREATE TYPE "QrStatus" AS ENUM ('WARNING', 'FINISH', 'IN_PROGRESS', 'WAITING_TASK', 'ON_PROB', 'ON_BGT_REQ');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INSTALLER', 'C_INSTALLER', 'PRJ_MNGR', 'SITE_MNGR', 'ADMIN', 'KABLAN');

-- CreateTable
CREATE TABLE "Qr" (
    "id" SERIAL NOT NULL,
    "qrNum" INTEGER NOT NULL,
    "prjId" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "aptNum" INTEGER NOT NULL,
    "front" TEXT,
    "locInApt" TEXT NOT NULL,
    "loc" TEXT,
    "curTaskId" INTEGER,
    "totalTasksCount" INTEGER NOT NULL DEFAULT 0,
    "totalTasksCompleted" INTEGER NOT NULL DEFAULT 0,
    "partId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "status" "QrStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Qr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "status" "TaskStatus",
    "media" TEXT[],
    "order" INTEGER NOT NULL,
    "price" INTEGER,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "isMedia" BOOLEAN NOT NULL DEFAULT false,
    "for" "Role" NOT NULL DEFAULT 'INSTALLER',
    "needApproval" BOOLEAN DEFAULT false,
    "curTaskQrId" INTEGER,
    "qrId" INTEGER NOT NULL,
    "mainTaskId" INTEGER NOT NULL,
    "kablanId" INTEGER,
    "note" TEXT,
    "prjId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitingTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "kablanId" INTEGER,
    "prjId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "type" "EventType" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrId" INTEGER NOT NULL,

    CONSTRAINT "WaitingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "kablanId" INTEGER,
    "prjId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "resById" INTEGER,
    "resAt" TIMESTAMP(3),
    "type" "EventType" NOT NULL DEFAULT 'COMPLETED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrId" INTEGER NOT NULL,

    CONSTRAINT "CompletedTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkippedTask" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "kablanId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER NOT NULL,
    "type" "EventType" NOT NULL DEFAULT 'SKIPPED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prjId" INTEGER NOT NULL,
    "qrId" INTEGER NOT NULL,

    CONSTRAINT "SkippedTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prob" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "media" TEXT[],
    "status" "ProbStatus" NOT NULL DEFAULT 'WAITING',
    "kablanId" INTEGER,
    "createdById" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "EventType" NOT NULL DEFAULT 'PROB',
    "resById" INTEGER,
    "resAt" TIMESTAMP(3),
    "taskId" INTEGER NOT NULL,
    "qrId" INTEGER NOT NULL,
    "prjId" INTEGER,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BgtReq" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "media" TEXT[],
    "status" "BgtReqStatus" NOT NULL DEFAULT 'WAITING',
    "amount" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "type" "EventType" NOT NULL DEFAULT 'BGT_REQ',
    "date" TIMESTAMP(3) NOT NULL,
    "kablanId" INTEGER,
    "qrId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "resById" INTEGER,
    "resAt" TIMESTAMP(3),
    "prjId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BgtReq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Msg" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "mentioned" INTEGER[],
    "userId" INTEGER NOT NULL,
    "probId" INTEGER,
    "breqId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Msg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "msgId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scan" (
    "id" SERIAL NOT NULL,
    "kablanId" INTEGER,
    "prjId" INTEGER NOT NULL,
    "qrNum" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "scanAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'INSTALLER',
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "otp" TEXT,
    "kablanId" INTEGER,
    "gglSub" TEXT,
    "gglName" TEXT,
    "picture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "printQntt" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "qntt" INTEGER NOT NULL,
    "prjId" INTEGER NOT NULL,
    "tasksId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainTask" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tasksId" INTEGER NOT NULL,
    "prjId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "media" BOOLEAN DEFAULT false,
    "for" "Role" NOT NULL DEFAULT 'INSTALLER',
    "price" INTEGER,
    "needApproval" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MainTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AptOpt" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "AptOpt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ProjectToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Qr_curTaskId_key" ON "Qr"("curTaskId");

-- CreateIndex
CREATE INDEX "Qr_qrNum_prjId_idx" ON "Qr"("qrNum", "prjId");

-- CreateIndex
CREATE UNIQUE INDEX "Qr_qrNum_prjId_key" ON "Qr"("qrNum", "prjId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Part_name_prjId_key" ON "Part"("name", "prjId");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_curTaskId_fkey" FOREIGN KEY ("curTaskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qr" ADD CONSTRAINT "Qr_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_mainTaskId_fkey" FOREIGN KEY ("mainTaskId") REFERENCES "MainTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingTask" ADD CONSTRAINT "WaitingTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingTask" ADD CONSTRAINT "WaitingTask_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingTask" ADD CONSTRAINT "WaitingTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingTask" ADD CONSTRAINT "WaitingTask_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_resById_fkey" FOREIGN KEY ("resById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedTask" ADD CONSTRAINT "CompletedTask_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkippedTask" ADD CONSTRAINT "SkippedTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkippedTask" ADD CONSTRAINT "SkippedTask_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkippedTask" ADD CONSTRAINT "SkippedTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkippedTask" ADD CONSTRAINT "SkippedTask_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prob" ADD CONSTRAINT "Prob_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prob" ADD CONSTRAINT "Prob_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prob" ADD CONSTRAINT "Prob_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prob" ADD CONSTRAINT "Prob_resById_fkey" FOREIGN KEY ("resById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prob" ADD CONSTRAINT "Prob_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BgtReq" ADD CONSTRAINT "BgtReq_qrId_fkey" FOREIGN KEY ("qrId") REFERENCES "Qr"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BgtReq" ADD CONSTRAINT "BgtReq_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BgtReq" ADD CONSTRAINT "BgtReq_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BgtReq" ADD CONSTRAINT "BgtReq_resById_fkey" FOREIGN KEY ("resById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BgtReq" ADD CONSTRAINT "BgtReq_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Msg" ADD CONSTRAINT "Msg_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Msg" ADD CONSTRAINT "Msg_probId_fkey" FOREIGN KEY ("probId") REFERENCES "Prob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Msg" ADD CONSTRAINT "Msg_breqId_fkey" FOREIGN KEY ("breqId") REFERENCES "BgtReq"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_msgId_fkey" FOREIGN KEY ("msgId") REFERENCES "Msg"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_qrNum_prjId_fkey" FOREIGN KEY ("qrNum", "prjId") REFERENCES "Qr"("qrNum", "prjId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scan" ADD CONSTRAINT "Scan_prjId_fkey" FOREIGN KEY ("prjId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AptOpt" ADD CONSTRAINT "AptOpt_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
