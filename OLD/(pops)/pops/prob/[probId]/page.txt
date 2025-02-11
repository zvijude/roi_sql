import { EventType } from '@/db/types'
import EventPop from '@/lib/events/ui/EventPop'
import { db } from '@/sql'

export default async function ProbPage({ params: { probId } }: any) {
  const probData = await db("Prob").where({ id: probId }).first()

  return (
    <div>
      <EventPop item={probData} type={EventType.PROB} />
    </div>
  )
}
