'use server'
import { db } from '@/db/db'
import { groupBy } from '@/utils/func'
import { TaskStatus } from '@prisma/client'

export async function getTasksByFloor(prjId) {
  prjId = Number(prjId)

  const res = await db.task.findMany({
    where: { prjId, status: { in: [TaskStatus.COMPLETED, TaskStatus.SKIPPED] } },
    select: { id: true, qr: { select: { floor: true } } },
  })

  const qrs = res.map(({ qr }) => qr)
  const floors = groupBy(qrs, ({ floor }) => `קומה ${floor}`) as Record<string, number[]>
  return Object.entries(floors).map(([floor, tasks]) => ({ floor, completedTasks: tasks.length }))
}
