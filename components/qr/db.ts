import { db } from '@/sql'

export async function scanQr(qrNum, prjId) {
  const res = await db.raw(`
    SELECT 
      q."id" AS "QrId",
      q.* AS "Qr",
      p.* AS "Part"
    FROM 
      "Qr" q
    LEFT JOIN 
      "Part" p ON q."partId" = p."id"
    WHERE 
      q."qrNum" = ${qrNum}
      AND q."prjId" = ${prjId}
    LIMIT 1;
  `)
  return res.rows[0]
}

export async function getCurTask(qrId) {
  const curTask = await db('Task as t')
    .join('Qr as q', 't.qrId', 'q.id')
    .join('MainTask as mt', 't.mainTaskId', 'mt.id')
    .where('q.id', qrId)
    .where('q.totalTasksCompleted', db.ref('mt.order'))
    .orderBy('t.id', 'asc')
    .select('t.id as TaskId', 't.*', 'q.id as QrId', 'q.*', 'mt.id as MainTaskId', 'mt.*')
    .first()

  if (!curTask) return null

  const events = await db('Prob').where('taskId', curTask.TaskId).select('*')

  return {
    ...curTask,
    id: curTask.TaskId,
    probs: events,
  }
}

export async function getQrHistory(prjId, qrNum) {
  const result = await db.raw(`SELECT get_qr_history(?, ?) AS history`, [prjId, qrNum])

  return result.rows?.[0]?.history || null
}
