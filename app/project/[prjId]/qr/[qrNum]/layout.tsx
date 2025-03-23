import { getUser, userInPrj } from '@/auth/authFuncs'
import { getAllAptOpt } from '@/components/aptOpt/db'
import { getPartsByPrj } from '@/components/setup/part/db'
import { getMissItemsByQr, getMissOpt } from '@/components/missing/db'
import { getMedidotByQr, getMedidotOpt } from '@/components/medidot/db'
import { AddNewMedidot } from '@/components/medidot/AddNewMedidot'
import { AddNewMiss } from '@/components/missing/AddNewMiss'
import { scanQr } from '@/components/qr/db'
import { Btn } from 'zvijude/btns'
import { QrStatus } from '@prisma/client'
import MedidotCard from '@/components/medidot/MedidotCard'
import MissCard from '@/components/missing/MissCard'

export default async function Layout({ children, params }) {
  let { prjId, qrNum } = await params

  const user = await getUser()
  if (!user) return null
  await userInPrj({ prjId, userId: user.id })

  const medidotOpt = await getMedidotOpt(prjId)
  const missOpt = await getMissOpt(prjId)
  const aptOpt = await getAllAptOpt(prjId)
  const parts = await getPartsByPrj(prjId)
  const qrData = await scanQr(qrNum, prjId)

  let missItems = null
  let medidot = null

  if (qrData) {
    missItems = (await getMissItemsByQr(qrData.QrId)) as any
    medidot = (await getMedidotByQr(qrData.QrId)) as any
  }

  return (
    <>
      {children}

      {qrData && (
        <div>
          <Btn
            popoverTarget='qr-menu'
            lbl='פעולות נוספות'
            icon='mobile'
            clr='text'
            size='small'
            className='text-xs w-full shadow-none'
          />
          <QrMenu qr={qrData} prjId={prjId} medidotOpt={medidotOpt} missOpt={missOpt} aptOpt={aptOpt} parts={parts} />
          <MedidotCard medidot={medidot} />
          <MissCard missItems={missItems} />
        </div>
      )}
    </>
  )
}

function QrMenu({ qr, prjId, medidotOpt, missOpt, aptOpt, parts }) {
  return (
    <div popover='auto' popoverTargetAction='toggle' id='qr-menu' className='p-4 bg-white shadow-lg rounded-lg w-64'>
      <div className='grid w-full gap-3'>
        <AddNewMedidot prjId={prjId} medidotOpt={medidotOpt} aptOpt={aptOpt} parts={parts} qr={qr} />
        <AddNewMiss prjId={prjId} missOpt={missOpt} qr={qr} aptOpt={aptOpt} parts={parts} />
        {qr?.status !== QrStatus.FINISH && (
          <>
            <Btn lbl='העלאת בעיה' popoverTarget='problemForm' icon='triangle-exclamation' clr='text' size='small' />
            <Btn lbl='בקשת חריגים' popoverTarget='bgtReqForm' icon='hand-holding-dollar' clr='text' size='small' flipIcon />
            <Btn lbl='דלג על המשימה' popoverTarget='skippedForm' icon='arrow-rotate-left' clr='text' size='small' flipIcon />
          </>
        )}
      </div>
    </div>
  )
}
