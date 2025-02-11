import { getFields } from '@/components/filter/getFields'
import Stats from '@/lib/prob/ui/Stats'
import ProbTableOLD from '@/lib/prob/ui/ProbTableOLD'
import { getProbs } from '@/lib/prob/db/get'
import ProbTable from '@/lib/prob/ui/ProbTable'

export default async function Problems({ params, searchParams }) {
  let { query } = await searchParams
  let { prjId } = await params
  prjId = Number(prjId)
  if (query) query = JSON.parse(query)

  const data = await getProbs(prjId)
  const fields = await getFields(prjId)

  return (
    <>
      <Stats data={data} />
      <ProbTable data={data} key={Math.random()} />
    </>
  )
}
