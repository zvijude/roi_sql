import Filter from '@/components/filter'
import EventsStats from '@/components/stats/EventsStats'
import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { Btn } from 'zvijude/btns'
import { getFields } from '@/components/filter/getFields'

export default async function EventsLayout({ params, children }) {
  let { prjId } = await params
  const opts = await getFields(prjId)
  // const user = await getUser()

  return (
    <div>
      {/* <Btn lbl='תצוגת מפה' icon='map' href={`/project/${prjId}/map_qrs`} className='absolute top-14 left-4' /> */}
      <Filter className='mb-8 mobile:mt-12' opts={opts} />
      {/* {isManager(user.role) && <EventsStats prjId={prjId} />} */}
      {children}
    </div>
  )
}
