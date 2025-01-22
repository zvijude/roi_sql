'use server'

import { sumBy } from '@/utils/func'
import { db } from '@/db/db'

export async function getPartsByPrj(prjId: number) {
  return await db.part
    .findMany({
      where: {
        prjId,
        tasksId: { not: null },
      },
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export async function getPartsQnt(prjId: number) {
  const parts = await db.part.findMany({
    where: { prjId },
    select: { qntt: true },
  })

  return sumBy(parts, 'qntt')
}

export async function getParts(prjId: number) {
  return await db.part.findMany({
    where: {
      tasksId: { not: null },
      prjId,
    },
  })
}

export async function getTasksByPart(prtId: number) {
  const part = await db.part.findUnique({
    where: { id: prtId },
    select: { tasksId: true },
  })
  const tasksId = part?.tasksId ?? null
  if (!tasksId) return { failed: true, msg: 'לא נמצא המשימות של הפריט' }

  const mainTasks = await db.mainTask.findMany({
    where: { tasksId },
  })

  return mainTasks.map((task) => ({ title: task.title, order: task.order, id: task.id }))
}
