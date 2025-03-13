import BgtReqNav from '@/components/events/BgtReqNav'
import BgtReq from '@/components/bgtReqs'

export default async function BgtReqs({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  return (
    <div className='grid'>
      <BgtReqNav filter={filter} />
      <BgtReq prjId={prjId} filter={filter} />
    </div>
  )
}
