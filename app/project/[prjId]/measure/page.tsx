import { getMeasureTable } from '@/lib/measure/db/get'
import MeasureTable from '@/lib/measure/ui/MeasureTable'

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  const data = await getMeasureTable(prjId)

  return (
    <div>
      <MeasureTable data={data} />
    </div>
  )
}
