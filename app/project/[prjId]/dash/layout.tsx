import EventsStats from '@/components/stats/EventsStats'
import Filter from '@/components/filter'
import EventsNav from '@/components/TblNavs/EventsNav'

export default async function Events({ params, children }) {
  let { prjId } = await params

  return (
    <div>
      <Filter className='mb-8' prjId={prjId} />
      <EventsStats prjId={prjId} />
      {/* <EventsNav /> */}

      {children}
    </div>
  )
}
