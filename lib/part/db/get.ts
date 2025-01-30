'use server'
import { db } from '@/sql'

export async function getPartsByPrj(prjId: number) {
  return await db('Part').where({ prjId }).andWhereNot({ tasksId: null })
}

export async function getTasksByPart(prtId: number) {
  const part = await db('Part').where({ id: prtId }).select('tasksId').first()
  const tasksId = part?.tasksId ?? null

  if (!tasksId) return { failed: true, msg: 'לא נמצא המשימות של הפריט' }
  const mainTasks = await db('MainTask').where({ tasksId })

  return mainTasks.map((task) => ({ title: task.title, order: task.order, id: task.id }))
}
