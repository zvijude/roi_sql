import { db } from '@/sql'
import { groupBy } from '@/utils/func'

export async function getMainTask(prjId: number) {
  const tasks = await db('MainTask').where({ prjId })
  const parts = await db('Part').where({ prjId })
  const prtsNoGrp = await db('Part').where({ prjId, tasksId: null })
  const grpTasks = Object.values(groupBy(tasks, ({ tasksId }) => tasksId))

  return { grpTasks, parts, prtsNoGrp }
}

export function formatTasks(tasks, prjId, tasksId) {
  return tasks.map((t, i) => {
    t.needMedia = t.needMedia ? true : false
    t.needApproval = t.needApproval ? true : false
    return { ...t, order: i, id: Number(t.id), tasksId, prjId }
  })
}
