import { EventType } from '@/db/types'
import EventPop from '@/lib/events/ui/EventPop'
import { db } from '@/sql'

export default async function SkippedTaskPage({ params: { taskId } }: any) {
  const task = await db("Task").where({ id: taskId }).first()

  return (
    <div>
      <EventPop item={task} type={EventType.SKIPPED} />
    </div>
  )
}
