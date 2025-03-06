'use client'
import TaskCompletionLine from './CompletedTasksLine'
import ProjProgressBar from './PrjProgressBar'
import QrsCompletedBar from './QrCompletedBar'
import QrsCircleChart from './QrsCircleChart'
import ScansByFloorChart from './ScansByFloorChart'
import TasksByFloorChart from './TasksByFloorChart'

export default function Dashboard({ data }) {
  const { completedTasks, qrsByStatus, qrs, scansByFloor, tasksByFloor } = data

  return (
    <div className='grid grid-cols-6 gap-4 pb-8 p-1 mobile:grid-cols-1 mobile:gap-4'>
      <div className='col-span-5 mobile:col-span-1'>
        <TasksByFloorChart data={tasksByFloor} />
      </div>
      <div className='col-span-1 mobile:col-span-1'>
        <ProjProgressBar finish={qrsByStatus.FINISH?.length || 0} total={qrs.length} />
      </div>

      <div className='col-span-2 mobile:col-span-1'>
        <ScansByFloorChart data={scansByFloor} />
      </div>
      <div className='col-span-4 mobile:col-span-1'>
        <TaskCompletionLine data={completedTasks} />
      </div>

      <div className='col-span-3 mobile:col-span-1'>
        <QrsCircleChart data={qrsByStatus} total={qrs.length} />
      </div>
      <div className='col-span-3 mobile:col-span-1'>
        <QrsCompletedBar data={qrs} />
      </div>
    </div>
  )
}
