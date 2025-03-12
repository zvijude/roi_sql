import { checkKablan, getKablan, getKablanStats } from '@/components/kablan/db'
import KablanStatsUi from '@/components/kablan/ui/kablanStatsUi'
import KablanTbl from '@/components/kablan/ui/KablanTbl'
import { isManager } from '@/db/types'
import Link from 'next/link'

export default async function Kablan({ params }) {
  let { prjId, kablanId } = await params

  const user = await checkKablan(prjId, kablanId)
  const kablan = await getKablan(prjId, kablanId)
  const curKablanStats = await getKablanStats(prjId, kablanId)

  return (
    <>
      {isManager(user.role) && <Link href={`/project/${prjId}/kablan`}>חזרה לכל הקבלנים</Link>}

      <KablanStatsUi curKablanStats={curKablanStats} />

      <KablanTbl kablan={kablan} />
    </>
  )
}
