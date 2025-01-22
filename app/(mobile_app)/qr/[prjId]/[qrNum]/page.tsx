import LocForm from '@/lib/qr/ui/LocForm'
import { scanQr } from '@/lib/qr/db/get'
import { getUser, userInPrj } from '@/auth/authFuncs'
import { isManager, roleLevels } from '@/db/types'
import { getParts } from '@/lib/part/db/get'
import { getAllAptOpt } from '@/lib/aptOpt/db/get'
import { QrTask } from '@/lib/qr/ui/QrTask'
// import { AllTasksCompleted } from '@/lib/qr/ui/AllTasksCompleted'
import { QrStatus } from '@prisma/client'
import { Btn } from 'zvijude/btns'

export default async function Page({ params: { prjId, qrNum } }) {
  prjId = Number(prjId)
  qrNum = Number(qrNum)

  await userInPrj({ prjId })
  const qrData = await scanQr(qrNum, prjId)
  const user = await getUser()

  if (!user) return

  // Case 1: QR not initialized
  if (!qrData) {
    const parts = await getParts(prjId)
    const aptOpt = await getAllAptOpt(prjId)

    return isManager(user.role) ? (
      <LocForm qrNum={qrNum} aptOpt={aptOpt} parts={parts} />
    ) : (
      <p className='text-center font-bold text-xl m-2'>
        QR מספר {qrNum} עדין לא מאותחל, פנה למנהל על מנת לאתחל אותו
      </p>
    )
  }

  // Case 2: All tasks completed
  if (qrData.status === QrStatus.FINISH) {
    return (
      <div>
        <p>כל המשימות של ברקוד מספר {qrNum} הושלמו</p>
        <Btn lbl='היסטורית QR' href={`/pops/project/${prjId}/qr/${qrNum}`} />
      </div>
    )
  }

  // Case 3: QR in action
  // const isAuthorized = qrData.curTask?.for
  //   ? roleLevels[user.role] >= roleLevels[qrData.curTask.for]
  //   : true
  // return <QrTask isAuthorized={isAuthorized} user={user} qrNum={qrNum} qrData={qrData} />
}
