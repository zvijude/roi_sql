import Missing from '@/components/missing'
import { getAllMissOpt } from '@/components/missing/db'
import MissingNav from '@/components/missing/MissingNav'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  const missOpt = await getAllMissOpt(prjId)

  return (
    <div className='grid'>
      <MissingNav filter={filter} itemOpt={missOpt} />
      <Missing prjId={prjId} filter={filter} />
    </div>
  )
}
