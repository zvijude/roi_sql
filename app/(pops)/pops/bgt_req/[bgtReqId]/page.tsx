import { EventType } from '@/db/types'
import EventPop from '@/lib/events/ui/EventPop'
import { db } from '@/sql'

export default async function BgtReqPage({ params: { bgtReqId } }: any) {
  const bgtReqData = await db("Prob").where({ id: bgtReqId }).first()

  return (
    <div>
      <EventPop item={bgtReqData} type={EventType.BGT_REQ} />
    </div>
  )
}
