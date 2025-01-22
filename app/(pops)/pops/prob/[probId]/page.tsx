import { getProbData } from '@/lib/prob/db/get'
import EventPop from '@/lib/events/ui/EventPop'

export default async function ProbPage({ params: { probId } }: any) {
  const probData = await getProbData(probId)

  return (
    <div>
      <EventPop item={probData} />
    </div>
  )
}
