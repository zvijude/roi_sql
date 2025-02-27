import { db } from '@/sql'

export async function getMissOpt(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('missOpt').first()
  return res.missOpt
}

export async function getMissActive(qrId) {
  const res = await db('missing').where({ qrId, isActive: true })
  return res
}
