import { db } from '@/db/db'
import { getCurUserQuery } from '@/lib/user/db/get'

export async function getBgtReqs(prjId, query = {}) {
  prjId = Number(prjId)
  const userQuery = await getCurUserQuery()

  const res = await db.bgtReq.findMany({
    where: { qr: { prjId }, ...query, ...userQuery },
    include: {
      qr: { include: { part: true } },
      createdBy: { select: { name: true } },
      resBy: { select: { name: true } },
      task: { select: { title: true } },
    },
    orderBy: { updatedAt: 'desc' },
  })
  return res
}

export async function getBgtReqData(id) {
  return await db.bgtReq.findUnique({
    where: { id: Number(id) },
    include: {
      qr: { include: { part: true } },
      task: { select: { id: true, title: true, desc: true, price: true } },
      createdBy: true,
      resBy: true,
    },
  })
}
