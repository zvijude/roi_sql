import { db } from '@/sql'

export async function getTasks(prjId: number) {
  return await db('_tasks').where({ prjId })
}

export async function getEventStats(prjId: number) {
  const res = await db.raw(`SELECT * FROM _get_stats(?);`, [prjId])
  return res.rows[0] || {}
}

/**
 * prob: {status}
 * Bgt_req: {price, status, probId}
 * Task: {price, status}
 */

/**
 * "Prob" -> type -> (Prob / Bgt_req)
 * Bgt_req -> Granted, Denied, Waiting, Cancelled //? Price
 * Prob -> Solved, , Waiting, Cancelled
 * Task -> null, Completed, Skipped, Waiting //? Price
 */

/**
 * Event
 * ---Dashboard---
 * Table1
 * Table2
 */
