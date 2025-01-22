import { getBgtReqData } from '@/lib/bgtReq/db/get'
import EventPop from '@/lib/events/ui/EventPop'

export default async function BgtReqPage({ params: { bgtReqId } }: any) {
  const bgtReqData = await getBgtReqData(bgtReqId)

  return (
    <div>
      <EventPop item={bgtReqData} />
    </div>
  )
}
