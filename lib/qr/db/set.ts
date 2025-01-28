'use server'

import { db } from '@/sql'
import { getUser } from '@/auth/authFuncs'
import { revalidatePath } from 'next/cache'
import { QrStatus } from '@prisma/client'

export async function insertQr(data: QrData) {
  const user = await getUser()

  const prt = JSON.parse(data.prt)
  const mainTasks = await db('MainTask').where({ tasksId: prt.tasksId })

  const [qr] = await db('Qr')
    .insert({
      qrNum: Number(data.qrNum),
      prjId: prt.prjId,
      floor: Number(data.floor),
      aptNum: Number(data.aptNum),
      locInApt: data.locInApt,
      front: data.front,
      partId: prt.id,
      totalTasksCount: mainTasks.length,
      createdById: user?.id,
    })
    .returning('id')
  const qrId = qr.id

  const tasks = await db('Task')
    .insert(
      mainTasks.map((t) => ({
        qrId,
        prjId: prt.prjId,
        mainTaskId: t.id,
      }))
    )
    .returning('*')

  const curTask = data.taskStageId
    ? tasks.find((t) => t.mainTaskId === Number(data.taskStageId))
    : tasks.find((t) => t.order === 0)

  await db('Qr')
    .where({ id: qrId })
    .update({ totalTasksCompleted: curTask?.order || 0 })

  revalidatePath('/project/[prjId]/qr/[qrNum]')
}

export async function connectQrToNextTask(curTask) {
  const { order, qrId } = curTask

  const nextTask = await db('Task')
    .where({ qrId })
    .andWhere('MainTask.order', order + 1)
    .join('MainTask', 'Task.mainTaskId', 'MainTask.id')
    .select('Task.id')
    .first()

  const nextTaskId = nextTask?.id
  if (!nextTaskId) return await updateQrStatus(qrId, QrStatus.FINISH)

  await db('Qr').where({ id: qrId }).increment('totalTasksCompleted', 1)
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
  await db('Qr').where({ id: qrId }).update({ status })
}

export async function editQrLoc(data) {
  const res = await db('Qr')
    .where({ qrNum: Number(data.qrNum), prjId: data.prjId })
    .update({
      floor: Number(data.floor),
      aptNum: Number(data.aptNum),
      locInApt: data.locInApt,
      front: data.front,
    })
    .returning('*')

  revalidatePath('/project/[prjId]/qr/[qrNum]')

  return res
}
