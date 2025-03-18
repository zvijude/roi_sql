import { checkKablan, getKablan, getKablanStats } from '@/components/kablan/db'
import KablanStatsUi from '@/components/kablan/ui/kablanStatsUi'
import KablanTbl from '@/components/kablan/ui/KablanTbl'
import { isManager } from '@/db/types'
import Link from 'next/link'
import Icon from 'zvijude/icon'

export default async function Kablan({ params }) {
  let { prjId, kablanId } = await params

  const user = await checkKablan(prjId, kablanId)
  const kablan = await getKablan(prjId, kablanId)
  const curKablanStats = await getKablanStats(prjId, kablanId)

  return (
    <>
      {isManager(user.role) && (
        <Link href={`/project/${prjId}/kablan`} className='flex border-b w-fit border-slate-400 mb-4'>
          <Icon name='arrow-right' className='size-3.5' />
          <p className='text-slate-600'>חזרה לכל הקבלנים</p>
        </Link>
      )}

      <KablanStatsUi curKablanStats={curKablanStats} />

      <KablanTbl kablan={kablan} />
    </>
  )
}
