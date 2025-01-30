import { getEvents } from '@/lib/events/db/get'
import { getEventStats2, getTasks } from '@/lib/events/db/getNew'
import EventsTable from '@/lib/events/ui/EventsTable'
import Stats from '@/lib/events/ui/Stats'
import { getProbs } from '@/lib/prob/db/get'

export default async function Events({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  // const events = await getEvents(prjId)
  const tasks = await getTasks(prjId)
  const probs = await getProbs(prjId)
  const eventsStats = await getEventStats2(prjId)

  return (
    <>
    <pre>
      {JSON.stringify(eventsStats, null, 2)}
      {JSON.stringify(tasks, null, 2)}
      {JSON.stringify(probs, null, 2)}
    </pre>
      {/* <Stats data={events} />
      <EventsTable data={events} key={Math.random()} /> */}
    </>
  )
}
