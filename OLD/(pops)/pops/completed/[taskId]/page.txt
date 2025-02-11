import { EventType } from '@/db/types'
import EventPop from '@/lib/events/ui/EventPop'
import { db } from '@/sql'

export default async function CompletedTaskPage({ params: { taskId } }: any) {
  const task = await db("Task").where({ id: taskId }).first()

  return (
    <div>
      <EventPop item={task} type={EventType.COMPLETED} />
    </div>
  )
}
