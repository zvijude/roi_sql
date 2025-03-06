import { getMainTask } from '@/components/setup/mainTask/db'
import MainTask from '@/components/setup/mainTask/ui/MainTask'

export default async function MainTasks({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  if (!prjId) return null

  const { grpTasks, parts, prtsNoGrp } = await getMainTask(prjId)

  return <MainTask grpTasks={grpTasks} prtsNoGrp={prtsNoGrp} parts={parts} prjId={prjId} key={Math.random()} />
}
