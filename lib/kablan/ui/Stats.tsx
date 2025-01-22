import StatsUi from '@/ui/StatsUi'
import { EventType } from '@prisma/client'
import { formatCurrency } from 'zvijude/funcs'

export default function Stats({ data }) {
  const stats = calcStats(data)
  return (
    <div className='flex gap-4 mb-2 mobile:gap-1 mobile:m-2 '>
      <StatsUi lbl='סה"כ מחיר לתשלום' stat={formatCurrency(stats.total)} className='font-bold' />
      <StatsUi lbl='משימות שבוצעו' stat={formatCurrency(stats.completedTasks)} />
      <StatsUi lbl='בקשות חריגים' stat={formatCurrency(stats.bgtReqs)} />
    </div>
  )
}

function calcStats(data) {
  return data.reduce(
    (sum, e) => {
      sum.total += e.task.price
      if (e.type === EventType.BGT_REQ) sum.bgtReqs += e.task.price
      if (e.type === EventType.COMPLETED) sum.completedTasks += e.task.price
      return sum
    },
    { total: 0, bgtReqs: 0, completedTasks: 0 }
  )
}
