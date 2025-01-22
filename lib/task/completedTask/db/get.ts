import { db } from '@/db/db'
import { getCurUserQuery } from '@/lib/user/db/get'

export async function getCompletedTasks(prjId: number, query = {}) {
  prjId = Number(prjId)
  const userQuery = await getCurUserQuery()
  const res = await db.completedTask.findMany({
    where: { prjId, ...query, ...userQuery },
    include: {
      qr: { select: { loc: true, qrNum: true, part: { select: { name: true } } } },
      task: { select: { price: true, title: true, order: true, note: true } },
      createdBy: { select: { name: true } },
      resBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  return res
}

export async function getCompletedTaskData(taskId: number) {
  taskId = Number(taskId)
  return await db.completedTask.findUnique({
    where: { id: taskId },
    include: {
      createdBy: { select: { name: true } },
      task: { select: { id: true, title: true, desc: true, price: true, media: true, note: true } },
      qr: { include: { part: true } },
    },
  })
}
