import { db } from '@/sql'

export async function getMissOpt(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('missOpt').first()
  return res.missOpt
}

export async function getMissItemsByQr(qrId) {
  const res = await db('missing').where({ qrId})
  return res
}
