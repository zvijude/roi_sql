import Periodic from '@/components/periodicTbl'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  return (
    <div>
      <Periodic prjId={prjId} filter={filter} />
    </div>
  )
}
