import { getFields } from '@/components/filter/getFields'
import { getSkippedTasks } from '@/lib/task/skippedTask/db/get'
import SkippedTasksTable from '@/lib/task/skippedTask/ui/SkippedTasksTable'
import Stats from '@/lib/task/skippedTask/ui/Stats'

export default async function SkippedTasks({ params: { prjId }, searchParams: { query } }) {
  prjId = Number(prjId)
  if (query) query = JSON.parse(query)

  const data = await getSkippedTasks(prjId, query)
  const fields = await getFields(prjId)

  return (
    <>
      <Stats data={data} />
      <SkippedTasksTable data={data} query={query} key={Math.random()} fields={fields} />
    </>
  )
}
