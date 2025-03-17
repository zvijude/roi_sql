import { getCurTask, scanQr } from '@/components/qr/db'
import { QrStatus } from '@prisma/client'
import LocationForm from '@/components/qr/ui/LocForm'
import QrHeader from '@/components/qr/ui/QrHeader'
import QrForm from '@/components/qr/ui/QrForm'
import CurTaskEvents from '@/components/qr/ui/QrActiveData'
import ProblemForm from '@/components/probs/ProbForm'
import BgtReqForm from '@/components/bgtReqs/BgtReqForm'
import TaskCompletionForm from '@/components/tasks/TaskCompletionForm'
import SkippedForm from '@/components/bgtReqs/SkippedForm'
import { getAllAptOpt } from '@/components/aptOpt/db'
import { getUser } from '@/auth/authFuncs'
import { getPartsByPrj } from '@/components/setup/part/db'
import { isManager } from '@/db/types'
import { Btn } from 'zvijude/btns'
import { getMedidotByQr } from '@/components/medidot/db'
import { getMissItemsByQr } from '@/components/missing/db'

export default async function Page({ params }) {
  let { prjId, qrNum } = params
  prjId = Number(prjId)
  qrNum = Number(qrNum)
  const user = await getUser()
  const qrData = await scanQr(qrNum, prjId)
  const aptOpt = await getAllAptOpt(prjId)
  const parts = await getPartsByPrj(prjId)

  // Case 1: QR not initialized
  if (!qrData) {
    return isManager(user.role) ? (
      <LocationForm qrNum={qrNum} aptOpt={aptOpt} parts={parts} />
    ) : (
      <p className='text-center font-bold text-xl m-2'>QR מספר {qrNum} עדין לא מאותחל, פנה למנהל על מנת לאתחל אותו</p>
    )
  }

  // we need to use both to show the miss & medidot of this QR
  const missItemsByQr = await getMissItemsByQr(qrData.QrId)
  const medidot = await getMedidotByQr(qrData.QrId)

  // Case 3: All tasks completed
  if (qrData.status === QrStatus.FINISH) {
    return (
      <div>
        <p>כל המשימות של ברקוד מספר {qrNum} הושלמו</p>
        <Btn lbl='היסטורית QR' href={`/pops/project/${prjId}/qr/${qrNum}`} />
      </div>
    )
  }
  const curTask = await getCurTask(qrData.QrId)
  return (
    <>
      <div className='grid place-items-center gap-4'>
        <QrHeader userRole={user.role} qrData={qrData} aptOpt={aptOpt} curTask={curTask} />
        <div className='w-full p-2 px-5 rounded shadow-3'>
          <p className='text-[16px] font-bold border-b border-gray-200 text-center'>{curTask.title}</p>
          <p className='my-1 py-1 text-sm text-gray-700'>{curTask.desc}</p>

          {!(curTask.status === 'WAITING') && Boolean(curTask.needApproval || curTask.needMedia) && (
            <div className='my-1 py-2 text-xs text-gray-700 font-semibold border-t border-gray-200'>
              {curTask.needApproval && <p>* משימה זו תעבור לאישור מנהל בסיום העבודה</p>}
              {curTask.needMedia && <p>* חובה להעלות תמונה או סרטון בסיום המשימה</p>}
            </div>
          )}
        </div>
        <QrForm curTask={curTask} userRole={user.role} qrStatus={qrData.status} />
        <CurTaskEvents events={curTask.probs} />
      </div>
      <pre>
        {JSON.stringify(missItemsByQr, null, 2)}
        {JSON.stringify(medidot, null, 2)}
      </pre>

      {/* Popups */}
      <ProblemForm taskId={curTask.TaskId} qrId={curTask.qrId} />
      <BgtReqForm taskId={curTask.TaskId} qrId={curTask.qrId} />
      <TaskCompletionForm curTask={curTask} qrStatus={qrData.status} />
      <SkippedForm curTask={curTask} />
    </>
  )
}
