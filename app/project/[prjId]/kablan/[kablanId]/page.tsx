import { checkKablan, getKablansNames } from '@/lib/kablan/db/get'
import SelectKablan from '@/lib/kablan/ui/SelectKablan'
import { isManager } from '@/db/types'
import { db } from '@/sql'
import StatsUi from '@/ui/StatsUi'
import TaskTable from '@/lib/task/ui/TaskTable'
import ProbTable from '@/lib/prob/ui/ProbTable'
import EventTables from '@/lib/events/ui/EventTables'

export default async function Kablan({ params }) {
  let { prjId, kablanId } = await params
  prjId = Number(prjId)
  kablanId = Number(kablanId)

  const user = await checkKablan(prjId, kablanId)

  const curKablanStats = await db('_all_kablans').where({ prjId, kablanId }).first()
  const tasks = await db('_tasks').where({ prjId, kablanId, status: 'COMPLETED' })
  const probs = await db('_probs').where({ prjId, kablanId, status: "GRANTED" })
  const kablanNames = await getKablansNames(prjId)

  return (
    <>
      <div className='flex mb-8'>
        {Object.entries(curKablanStats).map(([key, value]) => {
          if (key === 'prjId' || key === 'kablanId') return null
          return <StatsUi key={key} lbl={kablanDic[key]} stat={value as string | number} />
        })}
      </div>

      {isManager(user.role) && <SelectKablan kablans={kablanNames} key={Math.random()} prjId={prjId} />}

      <EventTables tasks={tasks} probs={probs} />
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
