import StatsUi from '@/ui/StatsUi'
import { formatCurrency } from 'zvijude/funcs'

export default function KablanStatsUi({ curKablanStats }) {
  if (!curKablanStats) return null
  
  // Ensure total_price is first in StatsUi
  const orderedStats = {
    total_price: curKablanStats.total_price,
    ...Object.fromEntries(Object.entries(curKablanStats).filter(([key]) => key !== 'total_price' && key !== 'kablan_id')),
  }
  return (
    <div className='flex mb-8'>
      {Object.entries(orderedStats).map(([key, value]) => {
        if (['total_price', 'price_tasks', 'price_bgt_reqs'].includes(key)) value = formatCurrency(value as number)
        return <StatsUi key={key} lbl={kablanDic[key] || key} stat={value as string | number} />
      })}
    </div>
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
