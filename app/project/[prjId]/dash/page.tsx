import Tabs from '@/components/Tabs'
import { getEventStats, getTasks } from '@/lib/events/db/get'
import EventTables from '@/lib/events/ui/EventTables'
import { getProbs } from '@/lib/prob/db/get'
import StatsEvents from '@/lib/stats'
import TaskTable from '@/lib/task/ui/TaskTable'
import { db } from '@/sql'
import StatsUi from '@/ui/StatsUi'
import { Btn } from 'zvijude/btns'
import { Input, Select } from 'zvijude/form'

export default async function Events({ params }) {
  let { prjId } = await params
  //   prjId = Number(prjId)

  let eventsStats = await db.raw(`SELECT * FROM _get_stats_grpd(?);`, [prjId])
  eventsStats = eventsStats.rows[0] || {}

  const taskSum = eventsStats.tasks.pop()
  const bgtReqsSum = eventsStats.bgtReqs.pop()

  const tasksTbl = await getTasks(prjId)

  return (
    <>
      <section className='mb-8'>
        <form className='flex items-end'>
          <Select lbl='חזית' options={[]} placeholder='בחירת חזית' />
          <Select lbl='קומה' options={[]} placeholder='בחירת קומה' />
          <Select lbl='דירה' options={[]} placeholder='בחירת דירה' />
          <Select lbl='תאריכים' options={[]} placeholder='בחירת תאריכים' />

          <Btn lbl='סינון' icon='filter' clr='text' />
        </form>
      </section>

      <div className='flex gap-4'>
        <StatsEvents data={eventsStats.tasks} sum={taskSum} title='משימות' />
        <StatsEvents data={eventsStats.bgtReqs} sum={bgtReqsSum} title='חריגים' />
        <StatsEvents data={eventsStats.probs} title='בעיות ביצוע' />
      </div>

      <section className='flex mt-8 gap-0'>
        <button className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>משימות</button>
        <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>חריגים ובעיות ביצוע</button>
      </section>

      <TaskTable data={tasksTbl} key={Math.random()} />
    </>
  )
}
