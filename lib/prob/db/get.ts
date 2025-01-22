import { db } from '@/db/db'
import { getCurUserQuery } from '@/lib/user/db/get'

export async function getProbs(prjId, query = {}) {
  prjId = Number(prjId)
  const userQuery = await getCurUserQuery()
  
  const res = await db.prob.findMany({
    where: { qr: { prjId }, ...query, ...userQuery },
    include: {
      qr: { select: { part: { select: { name: true } }, loc: true, qrNum: true } },
      task: true,
      createdBy: true,
      resBy: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  return res
}

export async function getProbData(probId) {
  probId = Number(probId)
  return await db.prob.findUnique({
    where: { id: probId },
    include: {
      qr: { include: { part: true } },
      task: { select: { id: true, title: true, desc: true, price: true } },
      createdBy: true,
      resBy: true,
    },
  })
}
