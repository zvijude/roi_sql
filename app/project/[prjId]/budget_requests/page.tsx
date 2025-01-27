import { getBgtReqs } from '@/lib/bgtReq/db/get'
import BgtReqTable from '@/lib/bgtReq/ui/BgtReqTable'
import { getFields } from '@/components/filter/getFields'
import Stats from '@/lib/bgtReq/ui/Stats'

export default async function BgtReqs({ params, searchParams }) {
  let { query } = await searchParams
  let { prjId } = await params
  if (query) query = JSON.parse(query)
  prjId = Number(prjId)

  const data = await getBgtReqs(prjId, query)
  const fields = await getFields(prjId)

  return (
    <>
      <Stats data={data} />
      <BgtReqTable data={data} key={Math.random()} query={query} fields={fields} />
    </>
  )
}
