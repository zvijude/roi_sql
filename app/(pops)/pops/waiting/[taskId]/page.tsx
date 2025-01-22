import { getWaitingTaskData } from '@/lib/task/waitingTask/db/get'
import EventPop from '@/lib/events/ui/EventPop'

export default async function WaitingTaskPage({ params: { taskId } }: any) {
  const task = await getWaitingTaskData(taskId)

  return <EventPop item={task} />
}
