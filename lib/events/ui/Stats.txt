import StatsUi from '@/ui/StatsUi'

export default function Stats({ data }) {
  const stats = calcStats(data)
  return (
    <div className='flex mb-8'>
      <StatsUi lbl='משימות שהושלמו' stat={stats.completedTasks} />
      <StatsUi lbl='בעיות ביצוע' stat={stats.openProblems} />
      <StatsUi lbl='בקשות חריגים' stat={stats.bgtReqs} />
      <StatsUi lbl='משימות ממתינות לאישור' stat={stats.waitingTasks} />
      <StatsUi lbl='משימות שדולגו' stat={stats.skippedTasks} />
    </div>
  )
}

function calcStats(data) {
  const completedTasks = data.filter((e) => e.type === 'COMPLETED').length
  const openProblems = data.filter((e) => e.type === 'PROB').length
  const bgtReqs = data.filter((e) => e.type === 'BGT_REQ').length
  const waitingTasks = data.filter((e) => e.type === 'WAITING').length
  const skippedTasks = data.filter((e) => e.type === 'SKIPPED').length
  return { completedTasks, openProblems, bgtReqs, waitingTasks, skippedTasks }
}
