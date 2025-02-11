'use server'

import { db } from '@/sql'

export async function getAllMissOpt(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('missOpt').first()
  return res.missOpt
}

export async function getMissActive(qrId) {
  const res = await db('missing').where({ qrId, isActive: true }).select('item', 'qntt', 'id')
  return res
}

export async function getAllMiss(prjId) {
  const res = await db('_miss').where({ prjId })
  return res
}
