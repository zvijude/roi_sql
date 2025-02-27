import { db } from "@/sql"

export async function getActiveMedidotByQr(qrId) {
  const res = await db('medidot').where({ qrId }).andWhere('isActive', true)
  return res
}

export async function getAllMedidotOpt(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('medidot_opt').first()
  return res.medidot_opt
}
