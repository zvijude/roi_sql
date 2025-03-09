import { checkKablan, getKablan, getKablanStats } from '@/components/kablan/db'
import KablanTbl from '@/components/kablan/ui/KablanTbl'
import { isManager } from '@/db/types'
import StatsUi from '@/ui/StatsUi'
import Link from 'next/link'

export default async function Kablan({ params }) {
  let { prjId, kablanId } = await params

  const user = await checkKablan(prjId, kablanId)
  const kablan = await getKablan(prjId, kablanId)
  const curKablanStats = await getKablanStats(prjId, kablanId)

  return (
    <>
      {/* כפתור חזרה לכל הקבלנים */}
      {isManager(user.role) && <Link href={`/project/${prjId}/kablan`}>חזרה לכל הקבלנים</Link>}

      {/* StatsUi for single Kablan */}
      <div className='flex mb-8'>
        {Object.entries(curKablanStats).map(([key, value]) => {
          if (key === 'kablan_id') return null // Exclude ID & name
          return <StatsUi key={key} lbl={kablanDic[key] || key} stat={value as string | number} />
        })}
      </div>

      <KablanTbl kablan={kablan} />
    </>
  )
}

const kablanDic = {
  kablan_name: 'שם הקבלן',
  total_price: 'סה"כ לתשלום',
  price_tasks: 'מחיר משימות שהושלמו',
  price_bgt_reqs: 'מחיר בקשות תקציב שאושרו',
  total_completed_tasks: 'סה"כ משימות שהושלמו',
  total_granted_bgt_reqs: 'סה"כ בקשות תקציב שאושרו',
}
