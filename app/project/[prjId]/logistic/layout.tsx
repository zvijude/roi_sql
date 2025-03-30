import Filter from '@/components/filter'
import { MedidotForm } from '@/components/qr/ui/qrForms/MedidotForm'
import { getMedidotOpt } from '@/components/medidot/db'
import { MissForm } from '@/components/qr/ui/qrForms/MissForm'
import { getMissOpt } from '@/components/missing/db'
import { db } from '@/sql'

export default async function Events({ params, children }) {
  let { prjId } = await params
  const res = await db.raw(`SELECT _get_filter_fields(?);`, [prjId])
  const opts = res.rows[0]._get_filter_fields

  const missOpt = await getMissOpt(prjId)
  const medidotOpt = await getMedidotOpt(prjId)

  return (
    <div>
      {/* <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
              <AddNewMedidot medidotOpt={medidotOpt} qrId={qrData.QrId} medidot={medidot} /> */}

      <Filter className='mb-8' opts={opts} />

      {children}
    </div>
  )
}
