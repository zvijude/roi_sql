import { getUser, userInPrj } from '@/auth/authFuncs'
import { getAllAptOpt } from '@/components/aptOpt/db'
import { getPartsByPrj } from '@/components/setup/part/db'
import { getMissOpt } from '@/components/missing/db'
import { getMedidotOpt } from '@/components/medidot/db'
import { AddNewMedidot } from '@/components/medidot/AddNewMedidot'
import { AddNewMiss } from '@/components/missing/AddNewMiss'
import { scanQr } from '@/components/qr/db'
import { Btn } from 'zvijude/btns'
import { QrStatus } from '@prisma/client'

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

  return (
    <>
      {children}

      {qrData?.QrId && (
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
        </div>
      )}
    </>
  )
}

function QrMenu({ qr, prjId, medidotOpt, missOpt, aptOpt, parts }) {
  return (
    <div popover='auto' id='qr-menu' className='p-4 bg-white shadow-lg rounded-lg w-64'>
      <div className='grid w-full gap-3'>
        <AddNewMedidot prjId={prjId} medidotOpt={medidotOpt} aptOpt={aptOpt} parts={parts} qrId={qr.QrId} />
        <AddNewMiss prjId={prjId} missOpt={missOpt} qrId={qr.QrId} aptOpt={aptOpt} parts={parts} />
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
