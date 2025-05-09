import { getUser, userInPrj } from '@/auth/authFuncs'
import { getMissItemsByQr } from '@/components/missing/db'
import { getMedidotByQr } from '@/components/medidot/db'
import { scanQr } from '@/components/qr/db'
import { Btn } from 'zvijude/btns'
import MedidotCard from '@/components/medidot/MedidotCard'
import MissCard from '@/components/missing/MissCard'
import { isManager, QrStatus } from '@/db/types'

export default async function Layout({ children, params }) {
  let { prjId, qrNum } = await params

  const user = await getUser()
  if (!user) return null
  await userInPrj({ prjId, userId: user.id })

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
          <QrMenu qr={qrData} role={user.role} />
          <MedidotCard medidot={medidot} userRole={user.role} />
          <MissCard missItems={missItems} userRole={user.role} />
        </div>
      )}
    </>
  )
}

function QrMenu({ qr, role }) {
  return (
    <div popover='auto' popoverTargetAction='toggle' id='qr-menu' className='p-4 bg-white shadow-lg rounded-lg w-64'>
      <div className='grid w-full gap-3'>
        {isManager(role) && (
          <>
            <Btn lbl='הוספת מדידות' popoverTarget='medidotForm' icon='ruler-combined' clr='text' size='small' flipIcon />
          </>
        )}
        <Btn lbl='הוספת חוסרים' popoverTarget='missForm' icon='circle-exclamation' clr='text' size='small' flipIcon />
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
