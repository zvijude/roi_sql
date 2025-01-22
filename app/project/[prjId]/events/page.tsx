import { getEvents } from '@/lib/events/db/get'
import EventsTable from '@/lib/events/ui/EventsTable'
import Stats from '@/lib/events/ui/Stats'

export default async function Events({ params: { prjId } }) {
  prjId = Number(prjId)
  const events = await getEvents(prjId)

  return (
    <>
      <Stats data={events} />
      <EventsTable data={events} key={Math.random()} />
    </>
  )
}
