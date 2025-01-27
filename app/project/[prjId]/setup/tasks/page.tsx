import { getMainTask } from '@/lib/mainTask/db/get'
import MainTask from '@/lib/mainTask/ui/MainTask'

export default async function MainTasks({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  if (!prjId) return null

  const res = await getMainTask(prjId)
  let { grpTasks, parts, prtsNoGrp } = JSON.parse(res)

  return (
    <MainTask
      grpTasks={grpTasks}
      prtsNoGrp={prtsNoGrp}
      parts={parts}
      prjId={prjId}
      key={Math.random()}
    />
  )
}
