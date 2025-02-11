import { EventType } from '@/db/types'
import EventPop from '@/lib/events/ui/EventPop'
import { db } from '@/sql'

export default async function WaitingTaskPage({ params: { taskId } }: any) {
  const task = await db("Task").where({ id: taskId }).first()

  return <EventPop item={task} type={EventType.WAITING} />
}
