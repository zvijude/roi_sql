import { getGlassInfoTbl } from '@/components/glass/db'
import GlassInfo from '@/components/glass/GlassInfo'
import Parts from '@/components/setup/part/ui/Parts'
import { db } from '@/sql'

export default async function partsPage({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  if (!prjId) return null

  const prts = await db('Part').where({ prjId }).orderBy('updatedAt', 'desc')
  const glassData = await getGlassInfoTbl(prjId)

  return (
    <div className='grid grid-cols-2 gap-8'>
      <Parts prts={prts} prjId={prjId} />
      <GlassInfo glassData={glassData} parts={prts} />
    </div>
  )
}
