import { checkKablan, getKablan, getKablanStats } from '@/components/kablan/db'
import KablanTbl from '@/components/kablan/ui/KablanTbl'
import { isManager } from '@/db/types'
import StatsUi from '@/ui/StatsUi'
import Link from 'next/link'
import { formatCurrency } from 'zvijude/funcs'

export default async function Kablan({ params }) {
  let { prjId, kablanId } = await params

  const user = await checkKablan(prjId, kablanId)
  const kablan = await getKablan(prjId, kablanId)
  const curKablanStats = await getKablanStats(prjId, kablanId)

  // Ensure total_price is first
  const orderedStats = {
    total_price: curKablanStats.total_price,
    ...Object.fromEntries(Object.entries(curKablanStats).filter(([key]) => key !== 'total_price' && key !== 'kablan_id')),
  }

  return (
    <>
      {isManager(user.role) && <Link href={`/project/${prjId}/kablan`}>חזרה לכל הקבלנים</Link>}

      {/* StatsUi for single Kablan */}
      <div className='flex mb-8'>
        {Object.entries(orderedStats).map(([key, value]) => {
          if (['total_price', 'price_tasks', 'price_bgt_reqs'].includes(key)) value = formatCurrency(value)
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
