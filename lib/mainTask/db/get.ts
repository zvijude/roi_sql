import { db } from '@/db/db'
import { groupBy } from '@/utils/func'

export async function getMainTask(prjId: number) {
  const tasks = await db.mainTask.findMany({
    where: { prjId },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      title: true,
      desc: true,
      price: true,
      media: true,
      needApproval: true,
      for: true,
      order: true,
      tasksId: true,
      tasks: {select: {id: true}},
      prjId: true,
    },
  })

  const objWithId = groupBy(tasks, ({ tasksId }) => tasksId)
  const res = Object.values(objWithId)

  const parts = await db.part.findMany({ where: { prjId } })
  const prtsNoGrp = await db.part.findMany({
    where: { AND: { prjId, tasksId: null } },
  })

  return JSON.stringify({ grpTasks: res, parts, prtsNoGrp })
}
