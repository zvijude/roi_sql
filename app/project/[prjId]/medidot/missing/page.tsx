import Missing from '@/components/missing'
import MissingNav from '@/components/missing/MissingNav'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  return (
    <div className='grid'>
      <MissingNav filter={filter} />
      <Missing prjId={prjId} filter={filter} />
    </div>
  )
}
