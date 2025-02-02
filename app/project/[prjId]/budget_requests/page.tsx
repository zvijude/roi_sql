import { getFields } from '@/components/filter/getFields'
import { getProbs } from '@/lib/prob/db/get'
import ProbTable from '@/lib/prob/ui/ProbTable'

export default async function BgtReqs({ params, searchParams }) {
  let { query } = await searchParams
  let { prjId } = await params
  if (query) query = JSON.parse(query)
  prjId = Number(prjId)

  const data = await getProbs(prjId)
  const fields = await getFields(prjId)

  return (
    <>
       <ProbTable data={data} key={Math.random()} />
    </>
  )
}
