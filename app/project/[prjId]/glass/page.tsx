import { AddGlass } from '@/components/glass/AddGlass'
import { AddGlassPallet } from '@/components/glass/AddGlassPallet'
import { getGlassInfoTbl, getGlassPallets, getGlassTbl } from '@/components/glass/db'
import GlassInfo from '@/components/glass/GlassInfo'
import GlassTable from '@/components/glass/tbl'
import { db } from '@/sql'

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)

  const pallets = await getGlassPallets(prjId)
  const glassTbl = await getGlassTbl(prjId)
  const glassInfo = await getGlassInfoTbl(prjId)

  const prts = await db('Part').where({ prjId }).orderBy('updatedAt', 'desc')
  const glassData = await getGlassInfoTbl(prjId)

  return (
    <div className='grid'>
      <div className='flex justify-between mb-2 items-end'>
        <h1 className='text-xl font-semibold'>מיפוי זכוכיות</h1>
        <span className='flex'>
          <AddGlassPallet prjId={prjId} />
          <AddGlass pallets={pallets} glassInfo={glassInfo} />
        </span>
      </div>
      <GlassTable data={glassTbl} key={Math.random()} />

      <GlassInfo glassData={glassData} parts={prts} className='my-8 grid' />
    </div>
  )
}
