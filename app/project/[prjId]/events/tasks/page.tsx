import TaskNav from '@/components/events/TaskNav'
import Tasks from '@/components/tasks'

export default async function Events({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  return (
    <div className='grid'>
      <TaskNav filter={filter} />
      <Tasks prjId={prjId} filter={filter} />
    </div>
  )
}
