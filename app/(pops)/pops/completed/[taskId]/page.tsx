import { getCompletedTaskData } from '@/lib/task/completedTask/db/get'
import EventPop from '@/lib/events/ui/EventPop'

export default async function CompletedTaskPage({ params: { taskId } }: any) {
  const task = await getCompletedTaskData(taskId)

  return (
    <div>
      <EventPop item={task} />
    </div>
  )
}
