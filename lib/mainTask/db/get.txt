import { db } from '@/sql'
import { groupBy } from '@/utils/func'

export async function getMainTask(prjId: number) {
  const tasks = await db('MainTask').where({ prjId })
  const parts = await db('Part').where({ prjId })
  const prtsNoGrp = await db('Part').where({ prjId, tasksId: null })
  const grpTasks = Object.values(groupBy(tasks, ({ tasksId }) => tasksId))

  return { grpTasks, parts, prtsNoGrp }
}
