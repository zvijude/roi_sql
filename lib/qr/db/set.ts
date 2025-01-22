'use server'

import { db } from '@/db/db'
import { getUser } from '@/auth/authFuncs'
import { revalidatePath } from 'next/cache'
import { QrStatus } from '@prisma/client'

export async function insertQr(data: QrData) {
  const user = await getUser()

  const prt = JSON.parse(data.prt)
  const mainTasks = await db.mainTask.findMany({
    where: {
      tasksId: prt.tasksId,
    },
  })

  const res = await db.qr.create({
    data: {
      qrNum: Number(data.qrNum),
      prjId: prt.prjId,
      floor: Number(data.floor),
      aptNum: Number(data.aptNum),
      locInApt: data.locInApt,
      front: data.front,
      part: { connect: { id: prt.id } },
      totalTasksCount: mainTasks.length,
      createdBy: { connect: { id: user?.id } },

      tasks: {
        createMany: {
          data: mainTasks.map((m) => ({
            mainTaskId: m.id,
            prjId: prt.prjId,
            order: m.order,
            price: m.price,
            title: m.title,
            desc: m.desc,
            isMedia: m.media ? true : false,
            needApproval: m.needApproval ? true : false,
          })),
        },
      },
    },
    select: {
      id: true,
      tasks: { select: { id: true, mainTask: { select: { id: true, order: true } } } },
    },
  })

  const curTask = data.taskStageId
    ? res.tasks.find((t) => t.mainTask.id === Number(data.taskStageId))
    : res.tasks.find((t) => t.mainTask.order === 0)

  await db.qr.update({
    where: { id: res.id },
    data: {
      curTask: { connect: { id: curTask?.id } },
      totalTasksCompleted: { increment: curTask?.mainTask?.order || 0 },
    },
  })

  revalidatePath('/project/[prjId]/qr/[qrNum]')
  return res
}

export async function connectQrToNextTask(curTask) {
  const { order, qrId } = curTask

  const nextTask = await db.task.findFirst({
    where: { qrId, order: order + 1 },
    select: { id: true },
  })

  const nextTaskId = nextTask?.id
  if (!nextTaskId) return await updateQrStatus(qrId, QrStatus.FINISH)

  await db.qr.update({
    where: { id: qrId },
    data: {
      totalTasksCompleted: { increment: 1 },
      curTask: { connect: { id: nextTaskId } },
    },
  })
}

export type QrData = {
  front: string
  qrNum: number
  prjId: number
  floor: number
  aptNum: number
  locInApt: string
  prt: string
  taskStageId?: number
}

export async function updateQrStatus(qrId: number, status: QrStatus) {
  await db.qr.update({
    where: { id: qrId },
    data: { status },
  })
}

export async function editQrLoc(data) {
  const res = await db.qr.update({
    where: { qrNum_prjId: { qrNum: Number(data.qrNum), prjId: data.prjId } },
    data: {
      floor: Number(data.floor),
      aptNum: Number(data.aptNum),
      locInApt: data.locInApt,
      front: data.front,
    },
  })

  revalidatePath('/project/[prjId]/qr/[qrNum]')

  return res
}
