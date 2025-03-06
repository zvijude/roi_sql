import { db } from '@/sql'

export async function getAllAptOpt(prjId) {
  prjId = Number(prjId)

  const res = await db('Project').where({ id: prjId }).select('aptOpt').first()

  return res.aptOpt
}
