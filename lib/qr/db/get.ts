'use server'

import { db } from '@/sql'

export async function getQrs({ prjId }) {
  return []
}

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
  const res = await db.raw(`SELECT 
    t.* AS "Task",
    mt.* AS "MainTask",
    q.* AS "Qr"
  FROM 
    "Task" t
  JOIN 
    "MainTask" mt ON t."mainTaskId" = mt."id"
  JOIN 
    "Qr" q ON t."qrId" = q."id"
  WHERE 
    q."id" = ${qrId}
    AND q."totalTasksCompleted" = mt."order";
`)

  return res.rows[0]
}
