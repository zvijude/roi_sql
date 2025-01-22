import CompletedTaskTable from '@/lib/task/completedTask/ui/CompletedTaskTable'
import { getCompletedTasks } from '@/lib/task/completedTask/db/get'
import { getFields } from '@/components/filter/getFields'
import Stats from '@/lib/task/completedTask/ui/Stats'

export default async function Tasks({ params: { prjId }, searchParams: { query } }) {
  prjId = Number(prjId)
  if (query) query = JSON.parse(query)

  const data = await getCompletedTasks(prjId, query)
  const fields = await getFields(prjId)

  return (
    <>
      <Stats data={data} />
      <CompletedTaskTable data={data} key={Math.random()} query={query} fields={fields} />
    </>
  )
}
