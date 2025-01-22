import { getFields } from '@/components/filter/getFields'
import WaitingTasksTable from '@/lib/task/waitingTask/ui/WaitingTasksTable'
import { getWaitingTasks } from '@/lib/task/waitingTask/db/get'
import Stats from '@/lib/task/waitingTask/ui/Stats'

export default async function WaitingTasks({ params: { prjId }, searchParams: { query } }) {
  prjId = Number(prjId)
  if (query) query = JSON.parse(query)

  const data = await getWaitingTasks(prjId, query)
  const fields = await getFields(prjId)

  return (
    <>
      <Stats data={data} />
      <WaitingTasksTable tasks={data} query={query} key={Math.random()} fields={fields} />
    </>
  )
}
