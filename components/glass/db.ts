import { db } from '@/sql'

export async function getGlassPallets(prj_id) {
  return await db('_pallet').where({ prj_id })
}
