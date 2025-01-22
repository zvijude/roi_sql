import EventPop from '@/lib/events/ui/EventPop'
import { getSkippedTaskData } from '@/lib/task/skippedTask/db/get'

export default async function SkippedTaskPage({ params: { taskId } }: any) {
  const task = await getSkippedTaskData(taskId)

  return (
    <div>
      <EventPop item={task} />
    </div>
  )
}
