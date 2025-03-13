import Filter from '@/components/filter'
import { AddNewMedidot } from '@/components/medidot/AddNewMedidot'
import { getAllMedidotOpt } from '@/components/medidot/db'
import { AddNewMiss } from '@/components/missing/AddNewMiss'
import { getMissOpt } from '@/components/missing/db'
import { db } from '@/sql'

export default async function Events({ params, children }) {
  let { prjId } = await params
  const res = await db.raw(`SELECT _get_filter_fields(?);`, [prjId])
  const opts = res.rows[0]._get_filter_fields

  const missOpt = await getMissOpt(prjId)
  const medidotOpt = await getAllMedidotOpt(prjId)

  return (
    <div>
      {/* <AddNewMiss missOpt={missOpt} qrId={qrData.QrId} active={missActive} />
              <AddNewMedidot medidotOpt={medidotOpt} qrId={qrData.QrId} medidot={medidot} /> */}

      <Filter className='mb-8' opts={opts} />

      {children}
    </div>
  )
}
