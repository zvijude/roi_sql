'use server'

import { db } from '@/sql'

/* 
`scanQr` returns `undefined` or the following object:
 {
  QrId: 1,
  id: 1,
  qrNum: 1,
  prjId: 1,
  status: 'IN_PROGRESS',
  floor: 1,
  aptNum: 1,
  front: null,
  locInApt: 'מטבח',
  loc: null,
  totalTasksCount: 3,
  totalTasksCompleted: 0,
  partId: 1,
  createdById: 1,
  createdAt: 2025-01-29T04:50:50.956Z,
  updatedAt: 2025-01-29T06:50:50.154Z,
  name: 'A-1',
  desc: 'wewf\n',
  qntt: 100,
  tasksId: 7286430
}
*/
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

/*
`getCurTask` returns the following object:
{
  "TaskId": 7,
  "id": 3,
  "status": "ON_PROB",
  "media": null,
  "qrId": 3,
  "mainTaskId": 4922370,
  "kablanId": null,
  "note": null,
  "prjId": 1,
  "createdAt": "2025-01-29T05:25:56.253Z",
  "updatedAt": "2025-01-29T05:25:56.253Z",
  "createdById": 1,
  "resById": null,
  "resAt": null,
  "title": "1",
  "desc": "1",
  "tasksId": 7286430,
  "order": 0,
  "for": "INSTALLER",
  "price": 1,
  "needApproval": false,
  "needMedia": false,
  "qrNum": 3,
  "floor": 1,
  "aptNum": 1,
  "front": null,
  "locInApt": "מטבח",
  "loc": null,
  "totalTasksCount": 3,
  "totalTasksCompleted": 0,
  "partId": 1
}
*/
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

export async function getQrs({ prjId }) {
  return []
}
