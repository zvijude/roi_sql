import { getFields } from '@/components/filter/getFields'
import Stats from '@/lib/prob/ui/Stats'
import { getProbs } from '@/lib/prob/db/get'
import ProbTable from '@/lib/prob/ui/ProbTable'

export default async function Problems({ params: { prjId }, searchParams: { query } }) {
  prjId = Number(prjId)
  if (query) query = JSON.parse(query)

  const data = await getProbs(prjId, query)
  const fields = await getFields(prjId)

  return (
    <>
      <Stats data={data} />
      <ProbTable data={data} key={Math.random()} query={query} fields={fields} />
    </>
  )
}
