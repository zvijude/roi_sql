import { db } from '@/sql'

export async function getTasks(prjId: number) {
  return await db('Task').select('*').where({ prjId })
}
export async function getProbs(prjId: number) {
  return await db('Prob').select('*').where({ prjId })
}

export async function getEventStats(prjId: number) {
  const res = await db.raw(`SELECT * FROM _stats`)
  return res.rows
}

export async function getEventStats2(prjId: number) {
  const res = await db.raw(`
SELECT
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED') AS "חריגים-אושר",
    COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED'), 0) AS "חריגים-בוצע-סכום",
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'DENIED') AS "חריגים-נדחה",
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'CANCELED') AS "חריגים-בוטל",
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'WAITING') AS "חריגים-ממתין",

    COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'SOLVED') AS "בעיות-פתור",
    COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'CANCELED') AS "בעיות-בוטל",
    COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'WAITING') AS "בעיות-ממתין",

    COUNT(*) FILTER (WHERE t.status = 'COMPLETED') AS "משימות-בוצע",
    COALESCE(SUM(mt.price) FILTER (WHERE t.status = 'COMPLETED'), 0) AS "משימות-בוצע-סכום",
    COUNT(*) FILTER (WHERE t.status = 'WAITING') AS "משימות-ממתין",
    COUNT(*) FILTER (WHERE t.status = 'SKIPPED') AS "משימות-נדחה"

FROM "Prob" p
JOIN "Task" t ON t.id = p."taskId"
JOIN "MainTask" mt ON t."mainTaskId" = mt.id
JOIN "Qr" q ON q.id = t."qrId"
WHERE q."prjId" = 1;
`)
  console.log('res.rows', res.rows)

  return res.rows
}

// {bgt1: status, amout, prjId} {bgt2: status, amout, prjId} {bgt3: status, amout, prjId}

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
