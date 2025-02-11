import { getAllMiss } from '@/lib/missing/db/get'
import MissTable from '@/lib/missing/ui/MissTable'

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  const data = await getAllMiss(prjId)

  return (
    <div>
      <MissTable data={data} />
    </div>
  )
}
