// import { getFields } from '@/components/filter/getFields'
// import PeriodicCharts from '@/lib/graph/ui/PeriodicCharts'
// import { getPartsByPrj } from '@/components/setup/part/db'
// import { getPeriodic, getPeriodicChartData } from '@/lib/periodicTable/db/get'
// import PeriodicTable from '@/lib/periodicTable/ui/PeriodicTable'
import { redirect } from 'next/navigation'

export default async function Page({ params, searchParams }) {
  let { query } = await searchParams
  let { prjId } = await params
  prjId = Number(prjId)

  if (query) query = JSON.parse(query)
  return redirect(`/project/${prjId}/events/tasks`)
  // Periodic Table
  // const qrsData = await getPeriodic(prjId, query)
  // filter
  // const fields = await getFields(prjId)
  // const parts = await getPartsByPrj(prjId)
  // chart
  // const qrsByStatus = await getPeriodicChartData(prjId)

  // return (
  // <>
  {
    /* <div className='rounded-md bg-white shadow mb-4'> */
  }
  {
    /* <PeriodicCharts data={qrsByStatus} /> */
  }
  {
    /* </div> */
  }
  {
    /* <PeriodicTable qrsData={qrsData} prjId={prjId} query={query} fields={fields} parts={parts} /> */
  }
  // </>
  // )
}
