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
        <TaskDetails curTask={curTask} />
        <QrHeader userRole={user.role} qrData={qrData} aptOpt={aptOpt} curTask={curTask} />
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
    <div className='w-full p-2 rounded shadow-1 bg-white'>
      <p className='font-semibold border-b pb-2'>משימה: {curTask.title}</p>
      <p className='py-2'>{curTask.desc}</p>

      {!isWaitingForApproval && Boolean(curTask.needApproval || curTask.needMedia) && (
        <div className='pt-2 text-xs text-gray-700 font-semibold border-t border-gray-200'>
          {curTask.needApproval && <p>* משימה זו תעבור לאישור מנהל בסיום העבודה</p>}
          {curTask.needMedia && <p>* חובה להעלות תמונה או סרטון בסיום המשימה</p>}
        </div>
      )}
    </div>
  )
}
