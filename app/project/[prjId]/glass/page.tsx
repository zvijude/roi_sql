import { getUser } from '@/auth/authFuncs'
import { AddGlass } from '@/components/glass/AddGlass'
import { AddGlassPallet } from '@/components/glass/AddGlassPallet'
import { getGlassInfoTbl, getGlassPallets, getGlassTbl } from '@/components/glass/db'
import GlassInfo from '@/components/glass/GlassInfo'
import GlassTable from '@/components/glass/tbl'
import { isManager } from '@/db/types'
import { db } from '@/sql'

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)

  const user = await getUser()
  const isManger = isManager(user.role)

  const pallets = await getGlassPallets(prjId)
  const glassTbl = await getGlassTbl(prjId)
  const glassInfo = await getGlassInfoTbl(prjId)

  const prts = await db('Part').where({ prjId }).orderBy('updatedAt', 'desc')
  const glassData = await getGlassInfoTbl(prjId)

  return (
    <div className='grid'>
      <div className='flex justify-between mb-2 items-end'>
        <h1 className='text-xl font-semibold'>מיפוי זכוכיות</h1>
        {isManger && (
          <span className='flex'>
            <AddGlassPallet prjId={prjId} />
            <AddGlass pallets={pallets} glassInfo={glassInfo} />
          </span>
        )}
      </div>

      {isManger && <GlassInfo glassData={glassData} parts={prts} className='my-8 grid' />}
      <GlassTable data={glassTbl} key={Math.random()} />
    </div>
  )
}
