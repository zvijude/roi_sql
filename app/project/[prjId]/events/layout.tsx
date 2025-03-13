import Filter from '@/components/filter'
import { db } from '@/sql'
import EventsStats from '@/components/stats/EventsStats'
import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'

export default async function EventsLayout({ params, children }) {
  let { prjId } = await params
  const res = await db.raw(`SELECT _get_filter_fields(?);`, [prjId])
  const opts = res.rows[0]._get_filter_fields
  const user = await getUser()

  return (
    <div>
      <Filter className='mb-8' opts={opts} />
      {isManager(user.role) && <EventsStats prjId={prjId} />}
      {children}
    </div>
  )
}
