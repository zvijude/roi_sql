'use server'

import { db } from '@/db/db'

export async function getQrs({ prjId }) {
  const res = await db.qr
    .findMany({
      where: { prjId: Number(prjId) },
      include: { part: true },
      orderBy: { updatedAt: 'desc' },
    })
    .catch((e) => {
      return { failed: true, msg: e.message }
    })

  return res
}

export async function scanQr(qrNum, prjId) {
  qrNum = Number(qrNum)
  prjId = Number(prjId)
  const qr = await db.qr.findUnique({
    where: { qrNum_prjId: { qrNum, prjId } },
    include: {
      part: true,
      curTask: { include: { bgtReqs: true, probs: true } },
    },
  })

  return qr
}
