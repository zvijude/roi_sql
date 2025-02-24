import { db } from '@/sql'
import StatsBox from './StatsBox'

export default async function StatsDash({ prjId }) {
  let eventsStats = await db.raw(`SELECT * FROM _get_stats_grpd(?);`, [prjId])
  eventsStats = eventsStats.rows[0] || {}

  const taskSum = eventsStats.tasks.pop()
  const bgtReqsSum = eventsStats.bgtReqs.pop()

  // flex gap-4 items-start flex-nowrap *:min-h-[232px]
  //   <div className='grid_fill gap-4' style={{ ['--size' as string]: '380px' }}>
  return (
    <div className='flex gap-4 items-start *:min-h-[232px]' style={{ ['--size' as string]: '380px' }}>
      <StatsBox data={eventsStats.tasks} sum={taskSum} title='משימות' />
      <StatsBox data={eventsStats.bgtReqs} sum={bgtReqsSum} title='חריגים' />
      <StatsBox data={eventsStats.probs} title='בעיות ביצוע' />
    </div>
  )
}
