import { getTasks } from '@/lib/events/db/get'
import EventsStats from '@/components/stats/EventsStats'
import Filter from '@/components/filter'
import EventsNav from '@/components/TblNavs/EventsNav'
import TaskTable from '@/components/tasks/tbl'

export default async function Events({ params }) {
  let { prjId } = await params
  const tasksTbl = await getTasks(prjId)

  return (
    <>
      <Filter className='mb-8' prjId={prjId} />
      <EventsStats prjId={prjId} />
      <EventsNav />
      <TaskTable data={tasksTbl} key={Math.random()} />
    </>
  )
}
