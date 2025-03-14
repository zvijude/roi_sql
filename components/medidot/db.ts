import { db } from '@/sql'

export async function getMedidotByQr(qrId) {
  const res = await db('medidot').where({ qrId })
  return res
}

export async function getMedidotOpt(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('medidot_opt').first()
  return res.medidot_opt
}
