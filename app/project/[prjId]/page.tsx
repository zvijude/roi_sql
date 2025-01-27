import { getFields } from '@/components/filter/getFields'
import PeriodicCharts from '@/lib/graph/ui/PeriodicCharts'
import { getPartsByPrj } from '@/lib/part/db/get'
import { getPeriodic, getPeriodicChartData } from '@/lib/periodicTable/db/get'
import PeriodicTable from '@/lib/periodicTable/ui/PeriodicTable'

export default async function Page({ params, searchParams }) {
  let { query } = await searchParams
  let { prjId } = await params
  prjId = Number(prjId)

  if (query) query = JSON.parse(query)
  const qrsData = await getPeriodic(prjId, query)
  const fields = await getFields(prjId)
  const parts = await getPartsByPrj(prjId)
  const qrsByStatus = await getPeriodicChartData(prjId)

  return (
    <>
      <div className='rounded-md bg-white shadow mb-4'>
        <PeriodicCharts data={qrsByStatus} />
      </div>
      <PeriodicTable qrsData={qrsData} prjId={prjId} query={query} fields={fields} parts={parts} />
    </>
  )
}
