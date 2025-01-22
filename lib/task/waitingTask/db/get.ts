import { db } from '@/db/db'
import { getCurUserQuery } from '@/lib/user/db/get'

export async function getWaitingTasks(prjId: number, query = {}) {
  prjId = Number(prjId)
  const userQuery = await getCurUserQuery()

  const res = await db.waitingTask.findMany({
    where: { prjId, ...query, ...userQuery },
    include: {
      qr: { select: { loc: true, qrNum: true, part: { select: { name: true } } } },
      task: { select: { price: true, title: true } },
      createdBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  return res
}

export async function getWaitingTaskData(taskId: number) {
  taskId = Number(taskId)
  return await db.waitingTask.findUnique({
    where: { id: taskId },
    include: {
      createdBy: { select: { name: true } },
      task: { select: { id: true, title: true, desc: true, price: true, media: true, note: true } },
      qr: { include: { part: true } },
    },
  })
}
