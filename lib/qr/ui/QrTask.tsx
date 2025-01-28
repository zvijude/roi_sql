'use client'

import QrForm from './QrForm'
import QrActiveData from './QrActiveData'
import ImgsCom from '@/lib/imgsCom'
import QrHeader from './QrHeader'
import { ProbStatus, TaskStatus } from '@prisma/client'
import ProblemForm from '@/lib/prob/ui/ProbForm'
import BgtReqForm from '@/lib/bgtReq/ui/BgtReqForm'
import TaskCompletionForm from '@/lib/task/completedTask/ui/TaskCompletionForm'

export function QrTask({ user, qrData, aptOpt, curTask }) {
  // const probsByStatus = formatProbStatus(curTask.probs)
  // const bgtReqByStatus = formatBgtReqStatus(curTask.bgtReqs)
  const probsByStatus = []
  const bgtReqByStatus = []

  // return <pre>
  //   {JSON.stringify(curTask, null, 2)}
  // </pre>

  return (
    <>
      <div className='grid place-items-center gap-4'>
        <QrHeader userRole={user.role} qrData={qrData} aptOpt={aptOpt} curTask={curTask} />
        <TaskDetails curTask={curTask} />
        <QrForm curTask={curTask} userRole={user.role} qrStatus={qrData.status} />
        <ImgsCom urls={curTask.media} />
        <QrActiveData probs={probsByStatus} bgtReqs={bgtReqByStatus} />
      </div>

      {/* Popups */}
      <ProblemForm taskId={curTask.id} qrId={curTask.qrId} />
      <BgtReqForm taskId={curTask.id} qrId={curTask.qrId} />
      <TaskCompletionForm curTask={curTask} qrStatus={qrData.status} />
    </>
  )
}

// function formatProbStatus(probs) {
//   const waiting = [] as any,
//     solved = [] as any,
//     canceled = [] as any
//   probs.forEach((p) => {
//     if (p.status === ProbStatus.WAITING) waiting.push(p)
//     if (p.status === ProbStatus.SOLVED) solved.push(p)
//     if (p.status === ProbStatus.CANCELED) canceled.push(p)
//   })

//   return { waiting, solved, canceled }
// }

// function formatBgtReqStatus(bgtReqs) {
//   const waiting = [] as any,
//     granted = [] as any,
//     denied = [] as any,
//     canceled = [] as any
//   bgtReqs.forEach((b) => {
//     if (b.status === BgtReqStatus.WAITING) waiting.push(b)
//     if (b.status === BgtReqStatus.GRANTED) granted.push(b)
//     if (b.status === BgtReqStatus.DENIED) denied.push(b)
//     if (b.status === BgtReqStatus.CANCELED) canceled.push(b)
//   })

//   return { waiting, granted, denied, canceled }
// }

function TaskDetails({ curTask }) {
  const isWaitingForApproval = curTask.status === TaskStatus.WAITING

  return (
    <div className='w-full p-2 px-5 rounded shadow-3'>
      <p className='text-[16px] font-bold border-b border-gray-200 text-center'>{curTask.title}</p>
      <p className='my-1 py-1 text-sm text-gray-700'>{curTask.desc}</p>

      {!isWaitingForApproval && Boolean(curTask.needApproval || curTask.media) && (
        <div className='my-1 py-2 text-xs text-gray-700 font-semibold border-t border-gray-200'>
          {curTask.needApproval && <p>* משימה זו תעבור לאישור מנהל בסיום העבודה</p>}
          {curTask.needMedia && <p>* חובה להעלות תמונה או סרטון בסיום המשימה</p>}
        </div>
      )}
    </div>
  )
}
