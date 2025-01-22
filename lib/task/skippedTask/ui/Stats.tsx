import StatsUi from '@/ui/StatsUi'

export default function Stats({ data }) {
  const stats = calcStats(data)
  return (
    <div className='flex gap-8 mb-8'>
      <StatsUi lbl='משימות שדולגו' stat={stats.tasks} />
      <StatsUi lbl='משימות שדולגו היום' stat={stats.tasksToday} />
    </div>
  )
}

function calcStats(data) {
  const today = new Date().toISOString().split('T')[0] // 2024-12-23
  return {
    tasks: data.length,
    tasksToday: data.filter((t) => t.createdAt && t.createdAt.toISOString().split('T')[0] === today)
      .length,
  }
}
