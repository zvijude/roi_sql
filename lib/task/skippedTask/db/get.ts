import { db } from '@/db/db'
import { getCurUserQuery } from '@/lib/user/db/get'

export async function getSkippedTasks(prjId: number, query = {}) {
  prjId = Number(prjId)
  const userQuery = await getCurUserQuery()

  return await db.skippedTask.findMany({
    where: { prjId, ...query, ...userQuery },
    include: {
      qr: { select: { loc: true, qrNum: true, part: { select: { name: true } } } },
      task: { select: { price: true, title: true, order: true, note: true } },
      createdBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getSkippedTaskData(taskId: number) {
  taskId = Number(taskId)
  return await db.skippedTask.findUnique({
    where: { id: taskId },
    include: {
      createdBy: { select: { name: true } },
      task: { select: { id: true, title: true, desc: true, price: true, media: true } },
      qr: { include: { part: true } },
    },
  })
}
