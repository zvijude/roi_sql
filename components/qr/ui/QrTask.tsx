'use client'

import QrForm from './QrForm'
import CurTaskEvents from './QrActiveData'
import QrHeader from './QrHeader'
import { TaskStatus } from '@prisma/client'
import BgtReqForm from '@/components/bgtReqs/BgtReqForm'
import ProblemForm from '@/components/probs/ProbForm'
import TaskCompletionForm from '@/components/tasks/TaskCompletionForm'
import ImgsCom from '@/ui/imgsCom'

export function QrTask({ user, qrData, aptOpt, curTask }) {
  return (
    <>
      <div className='grid place-items-center gap-4'>
        <QrHeader userRole={user.role} qrData={qrData} aptOpt={aptOpt} curTask={curTask} />
        <TaskDetails curTask={curTask} />
        <QrForm curTask={curTask} userRole={user.role} qrStatus={qrData.status} />
        <ImgsCom urls={curTask.media} />
        <CurTaskEvents events={curTask.probs} />
      </div>

      {/* Popups */}
      <ProblemForm taskId={curTask.TaskId} qrId={curTask.qrId} />
      <BgtReqForm taskId={curTask.TaskId} qrId={curTask.qrId} />
      <TaskCompletionForm curTask={curTask} qrStatus={qrData.status} />
    </>
  )
}

function TaskDetails({ curTask }) {
  const isWaitingForApproval = curTask.status === TaskStatus.WAITING

  return (
    <div className='w-full p-2 px-5 rounded shadow-3'>
      <p className='text-[16px] font-bold border-b border-gray-200 text-center'>{curTask.title}</p>
      <p className='my-1 py-1 text-sm text-gray-700'>{curTask.desc}</p>

      {!isWaitingForApproval && Boolean(curTask.needApproval || curTask.needMedia) && (
        <div className='my-1 py-2 text-xs text-gray-700 font-semibold border-t border-gray-200'>
          {curTask.needApproval && <p>* משימה זו תעבור לאישור מנהל בסיום העבודה</p>}
          {curTask.needMedia && <p>* חובה להעלות תמונה או סרטון בסיום המשימה</p>}
        </div>
      )}
    </div>
  )
}
