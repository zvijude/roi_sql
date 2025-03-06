import Missing from '@/components/missing'
import { getMissOpt } from '@/components/missing/db'
import MissingNav from '@/components/missing/MissingNav'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  const missOpt = await getMissOpt(prjId)

  return (
    <div className='grid'>
      <MissingNav filter={filter} itemOpt={missOpt} />
      <Missing prjId={prjId} filter={filter} />
    </div>
  )
}
