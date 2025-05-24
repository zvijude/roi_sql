import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import EventsStats from '@/components/stats/EventsStats'
import { getProjectName } from '@/db/project/get'
import QrsCircleChart from '@/lib/graph/ui/QrsCircleChart'
import { db } from '@/sql'

export default async function Page({ params, searchParams }) {
  let { query } = await searchParams
  let { prjId } = await params
  prjId = Number(prjId)
  const user = await getUser()
  const prjName = await getProjectName(prjId)
  const data = (await db.raw(`SELECT * FROM get_qrs_chart_data(?)`, [prjId])).rows[0]

  if (query) query = JSON.parse(query)
  // return redirect(`/project/${prjId}/events/tasks`)

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center rtl:pr-4 ltr:pl-4' dir='rtl' lang='he'>
        ברוך הבא לפרויקט <span className='text-primary'>{prjName}</span>
      </h1>
      {isManager(user.role) && <EventsStats prjId={prjId} />}
      <QrsCircleChart data={data} />
    </div>
  )
}
