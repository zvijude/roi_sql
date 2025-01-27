import { getEvents } from '@/lib/events/db/get'
import EventsTable from '@/lib/events/ui/EventsTable'
import Stats from '@/lib/events/ui/Stats'

export default async function Events({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  const events = await getEvents(prjId)

  return (
    <>
      <Stats data={events} />
      <EventsTable data={events} key={Math.random()} />
    </>
  )
}
