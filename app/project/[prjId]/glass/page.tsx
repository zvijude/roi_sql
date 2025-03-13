import { AddGlass } from '@/components/glass/AddGlass'
import { AddGlassPallet } from '@/components/glass/AddGlassPallet'
import { getGlassInfoTbl, getGlassPallets, getGlassTbl } from '@/components/glass/db'
import GlassInfo from '@/components/glass/GlassInfo'
import GlassPalletCard from '@/components/glass/GlassPalletCard'
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
    <div>
      <AddGlassPallet prjId={prjId} />
      {/* <GlassPalletCard pallets={pallets} /> */}
      <AddGlass pallets={pallets} glassInfo={glassInfo} />
      <GlassTable data={glassTbl} />

      <GlassInfo glassData={glassData} parts={prts} className='my-8' />
    </div>
  )
}
