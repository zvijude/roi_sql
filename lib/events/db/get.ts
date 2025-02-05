import { db } from '@/sql'

export async function getTasks(prjId: number) {
  return await db('_tasks').where({ prjId })
}

export async function getEventStats(prjId: number) {
  const res = await db.raw(`SELECT * FROM _get_stats(?);`, [prjId])
  return res.rows[0] || {}
}