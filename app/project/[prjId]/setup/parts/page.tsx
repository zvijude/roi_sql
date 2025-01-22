import Parts from '@/lib/part/ui/Parts'
import { db } from '@/db/db'

export default async function partsPage({ params: { prjId } }) {
  prjId = Number(prjId)
  if (!prjId) return null

  const prts = await db.part.findMany({ where: { prjId }, orderBy: { updatedAt: 'desc' } })

  return <Parts prts={prts} prjId={prjId} />
}
