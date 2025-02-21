import Probs from '@/components/probs'
import ProbsNav from '@/components/probs/ProbsNav'

export default async function Problems({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  return (
    <div className='grid'>
      <ProbsNav filter={filter} />
      <Probs prjId={prjId} filter={filter} />
    </div>
  )
}
