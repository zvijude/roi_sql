import Probs from '@/components/probs'
import EventsNav from '@/components/TblNavs/EventsNav'

export default async function Problems({ params }) {
  let { prjId } = await params

  return (
    <>
      <EventsNav />
      <Probs prjId={prjId} />
    </>
  )
}
