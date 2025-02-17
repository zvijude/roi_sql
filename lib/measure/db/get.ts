'use server'

import { db } from '@/sql'

export async function getMeasureTable(prjId) {
  const res = await db('_measure').where({ prjId })
  return res
}
export async function getMeasureByQr(qrId) {
  const res = await db('measure').where({ qrId })
  return res
}

export async function getAllMeasureOpt(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('measureOpt').first()
  return res.measureOpt
}
