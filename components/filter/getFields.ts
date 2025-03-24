import { db } from '@/sql'

export async function getFields(prjId: number) {
  const res = await db.raw(`SELECT _get_filter_fields(?);`, [prjId])
  return res.rows[0]._get_filter_fields
}
