import Parts from '@/lib/part/ui/Parts'
import { db } from '@/sql'

export default async function partsPage({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  if (!prjId) return null

  const prts = await db('Part').where({ prjId }).orderBy('updatedAt', 'desc')

  return <Parts prts={prts} prjId={prjId} />
}
