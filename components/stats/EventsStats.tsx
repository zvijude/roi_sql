import { db } from '@/sql'
import StatsBox from './StatsBox'

export default async function StatsDash({ prjId }) {
  let eventsStats = await db.raw(`SELECT * FROM _get_stats_grpd(?);`, [prjId])
  eventsStats = eventsStats.rows[0] || {}

  const taskSum = eventsStats.tasks?.pop()
  const bgtReqsSum = eventsStats.bgtReqs?.pop()

  // flex gap-4 items-start flex-nowrap *:min-h-[232px]
  //   <div className='grid_fill gap-4' style={{ ['--size' as string]: '380px' }}>
  return (
    <div
      className='flex gap-4 items-start *:min-h-[238px] justify-around'
      //style={{ ['--size' as string]: '380px' }}
    >
      <StatsBox data={eventsStats.tasks} sum={taskSum} title='משימות' prjId={prjId} />
      <StatsBox data={eventsStats.bgtReqs} sum={bgtReqsSum} title='בקשות חריגים' prjId={prjId} />
      <StatsBox data={eventsStats.probs} title='בעיות ביצוע' prjId={prjId} />
    </div>
  )
}
