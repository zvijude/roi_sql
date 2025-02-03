// import { db } from '@/db/db'
import QrsCircleChart from '@/lib/graph/ui/QrsCircleChart'
import { groupBy } from '@/utils/func'
import ProjProgressBar from '@/lib/graph/ui/PrjProgressBar'
import TaskCompletionLine from '@/lib/graph/ui/CompletedTasksLine'
import QrsCompletedBar from '@/lib/graph/ui/QrCompletedBar'
import Dashboard from '@/lib/graph/ui/Dashboard'
import { getTasksByFloor } from '@/lib/graph/db/get'
import { getPrjScansByFloor } from '@/lib/scan/db/get'

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)

  const tasksByFloor = await getTasksByFloor(prjId)
  const scansByFloor = await getPrjScansByFloor(prjId)
  // const qrs = await db.qr.findMany({
    // where: { prjId },
    // select: { status: true, updatedAt: true },
  // })
  // const completedTasks = await db.completedTask.findMany({
    // where: { prjId },
    // select: { createdAt: true },
  // })

  // const qrsByStatus = groupBy(qrs, ({ status }) => status)
  // const data = { completedTasks, qrsByStatus, qrs, scansByFloor, tasksByFloor }

  // return <Dashboard data={data} key={Math.random()} />
  return <div>DASH</div>
}
