import EventsStats from '@/components/stats/EventsStats'
import Filter from '@/components/filter'
import { db } from '@/sql'

export default async function Events({ params, children }) {
  let { prjId } = await params
  const res = await db.raw(`SELECT _get_filter_fields(?);`, [prjId])
  const opts = res.rows[0]._get_filter_fields
  console.log('opts : ', opts)

  return (
    <div>
      <Filter className='mb-8' opts={opts} />
      <EventsStats prjId={prjId} />

      {children}
    </div>
  )
}
