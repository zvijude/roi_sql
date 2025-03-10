import LocForm from '@/components/qr/ui/LocForm'
import { getCurTask, scanQr } from '@/components/qr/db'
import { getUser, userInPrj } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { getPartsByPrj } from '@/components/setup/part/db'
import { getAllAptOpt } from '@/components/aptOpt/db'
import { QrTask } from '@/components/qr/ui/QrTask'
import { QrStatus } from '@prisma/client'
import { Btn } from 'zvijude/btns'
import { getMissOpt, getMissActive } from '@/components/missing/db'
import { AddNewMiss } from '@/components/missing/AddNewMiss'
import { getAllMedidotOpt, getMedidotByQr } from '@/components/medidot/db'
import { AddNewMedidot } from '@/components/medidot/AddNewMedidot'

export default async function Page({ params }) {
  let { prjId, qrNum } = await params
  prjId = Number(prjId)
  qrNum = Number(qrNum)

  const user = await getUser()
  if (!user) return
  await userInPrj({ prjId, userId: user.id })

  const qrData = await scanQr(qrNum, prjId)
  const aptOpt = await getAllAptOpt(prjId)
  const missOpt = await getMissOpt(prjId)
  const medidotOpt = await getAllMedidotOpt(prjId)


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
  const medidot = await getMedidotByQr(qrData.QrId)

  // Case 2: No Task in QR, page חוסרים ומידות
  if (qrData.totalTasksCount === 0)
    return (
      <div>
        <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
        <AddNewMedidot medidotOpt={medidotOpt} qrId={qrData.QrId} medidot={medidot} />
      </div>
    )

  // Case 3: All tasks completed
  if (qrData.status === QrStatus.FINISH) {
    return (
      <div>
        <p>כל המשימות של ברקוד מספר {qrNum} הושלמו</p>
        <Btn lbl='היסטורית QR' href={`/pops/project/${prjId}/qr/${qrNum}`} />
        <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
        <AddNewMedidot medidotOpt={medidotOpt} qrId={qrData.QrId} medidot={medidot} />
      </div>
    )
  }

  // Case 4: QR in action
  const curTask = await getCurTask(qrData.QrId)
  return (
    <div>
      <QrTask user={user} qrData={qrData} aptOpt={aptOpt} curTask={curTask} />
      <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
      <AddNewMedidot medidotOpt={medidotOpt} qrId={qrData.QrId} medidot={medidot} />
    </div>
  )
}
