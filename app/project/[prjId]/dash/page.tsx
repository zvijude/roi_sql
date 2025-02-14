import Tabs from '@/components/Tabs'
import { getEventStats, getTasks } from '@/lib/events/db/get'
import EventTables from '@/lib/events/ui/EventTables'
import { getProbs } from '@/lib/prob/db/get'
import StatsEvents from '@/lib/stats'
import SmallStats from '@/lib/stats/SmallStats'
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
  console.log('eventsStats: ', eventsStats)

  const taskSum = eventsStats.tasks.pop()
  const bgtReqsSum = eventsStats.bgtReqs.pop()

  const tasksTbl = await getTasks(prjId)

  return (
    <>
      <section className='mb-8'>
        <form className='flex items-end *:min-w-24'>
          <Select lbl='חזית' options={[]} placeholder='הכל' />
          <Select lbl='קומה' options={[]} placeholder='הכל' />
          <Select lbl='דירה' options={[]} placeholder='הכל' />
          <Select lbl='תאריכים' options={[]} placeholder='הכל' />

          <Btn lbl='סינון' icon='filter' clr='text' />
        </form>
      </section>

      {/* <div className='grid grid-cols-4 gap-2'> */}
      <div className='flex gap-4 items-start flex-nowrap *:h-[232px]'>
        <StatsEvents data={eventsStats.tasks} sum={taskSum} title='משימות' />
        <StatsEvents data={eventsStats.bgtReqs} sum={bgtReqsSum} title='חריגים' />
        <StatsEvents data={eventsStats.probs} title='בעיות ביצוע' />
      </div>

      <section className='flex mt-8 justify-between'>
        <div className='flex gap-0'>
          <button className='px-8 border-b-2 pb-1 border-[#1E4DB4] text-[#1E4DB4] font-semibold'>משימות</button>
          <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>חריגים ובעיות ביצוע</button>
        </div>

        <div className='flex gap-0'>
          <button className='px-8 border-b-2 pb-1 border-[#f5866d] text-[#f5866d] font-semibold'>הכל</button>
          <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>אושרו</button>
          <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>בהמתנה</button>
          <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>דולגו</button>
        </div>
      </section>

      <TaskTable data={tasksTbl} key={Math.random()} />
    </>
  )
}
