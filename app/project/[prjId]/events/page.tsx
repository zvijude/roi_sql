import { getEventStats, getTasks } from '@/lib/events/db/getNew'
import EventsTable from '@/lib/events/ui/EventsTableOLD'
import EventTables from '@/lib/events/ui/EventTables'
import { getProbs } from '@/lib/prob/db/get'
import ProbTable from '@/lib/prob/ui/ProbTable'
import TaskTable from '@/lib/task/ui/TaskTable'
import StatsUi from '@/ui/StatsUi'

export default async function Events({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  const tasks = await getTasks(prjId)
  const probs = await getProbs(prjId)
  const eventsStats = await getEventStats(prjId)

  return (
    <>
      <div className='flex mb-8'>
        {Object.entries(eventsStats).map(([key, value]) => {
          if (key === 'prjId') return null
          return <StatsUi key={key} lbl={key} stat={value as string | number} />
        })}
      </div>
      <EventTables probs={probs} tasks={tasks}/>
    </>
  )
}
