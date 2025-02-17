import LocForm from '@/lib/qr/ui/LocForm'
import { getCurTask, scanQr } from '@/lib/qr/db/get'
import { getUser, userInPrj } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { getPartsByPrj } from '@/lib/part/db/get'
import { getAllAptOpt } from '@/lib/aptOpt/db/get'
import { QrTask } from '@/lib/qr/ui/QrTask'
import { QrStatus } from '@prisma/client'
import { Btn } from 'zvijude/btns'
import { getAllMissOpt, getMissActive } from '@/lib/missing/db/get'
import { AddNewMiss } from '@/lib/missing/ui/AddNewMiss'
import { getAllMeasureOpt, getMeasureByQr } from '@/lib/measure/db/get'
import { AddNewMeasure } from '@/lib/measure/ui/AddNewMeasure'

export default async function Page({ params }) {
  let { prjId, qrNum } = await params
  prjId = Number(prjId)
  qrNum = Number(qrNum)

  const user = await getUser()
  if (!user) return
  await userInPrj({ prjId, userId: user.id })

  const qrData = await scanQr(qrNum, prjId)
  const aptOpt = await getAllAptOpt(prjId)
  const missOpt = await getAllMissOpt(prjId)
  const measureOpt = await getAllMeasureOpt(prjId)

  // Case 1: QR not initialized
  if (!qrData) {
    const parts = await getPartsByPrj(prjId)

    return isManager(user.role) ? (
      <LocForm qrNum={qrNum} aptOpt={aptOpt} parts={parts} />
    ) : (
      <p className='text-center font-bold text-xl m-2'>QR מספר {qrNum} עדין לא מאותחל, פנה למנהל על מנת לאתחל אותו</p>
    )
  }

  const missActive = await getMissActive(qrData.QrId)
  const measures = await getMeasureByQr(qrData.QrId)

  // Case 2: No Task in QR, page חוסרים ומידות
  if (qrData.totalTasksCount === 0)
    return (
      <div>
        <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
        <AddNewMeasure measureOpt={measureOpt} qrId={qrData.QrId} measures={measures} />
      </div>
    )

  // Case 3: All tasks completed
  if (qrData.status === QrStatus.FINISH) {
    return (
      <div>
        <p>כל המשימות של ברקוד מספר {qrNum} הושלמו</p>
        <Btn lbl='היסטורית QR' href={`/pops/project/${prjId}/qr/${qrNum}`} />
        <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
        <AddNewMeasure measureOpt={measureOpt} qrId={qrData.QrId} measures={measures} />
      </div>
    )
  }

  // Case 4: QR in action
  const curTask = await getCurTask(qrData.QrId)
  return (
    <div>
      <QrTask user={user} qrData={qrData} aptOpt={aptOpt} curTask={curTask} />
      <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
      <AddNewMeasure measureOpt={measureOpt} qrId={qrData.QrId} measures={measures} />
    </div>
  )
}
