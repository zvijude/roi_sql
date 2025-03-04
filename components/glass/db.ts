import { db } from '@/sql'

export async function getGlassPallets(prjId) {
  return await db('_pallet').where({ prjId })
}

export async function getGlassInfoTbl(prjId) {
  return await db('_glass_info').where({ prjId })
}

export async function getGlassTbl(prjId) {
  return await db('_glass').where({ prjId })
}
