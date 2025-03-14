import { db } from '@/sql'
import MedidotTbl from './MedidotTbl'
import { dateFilters } from '../filter/formatFilter'
import { AddNewMedidot } from './AddNewMedidot'
import { getAllAptOpt } from '../aptOpt/db'
import { getPartsByPrj } from '../setup/part/db'
import { getMedidotOpt } from './db'

export default async function Medidot({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_medidot').where({ prjId, ...filter })
  if (date) query.whereRaw(dateFilters[date])

  const aptOpt = await getAllAptOpt(prjId)
  const parts = await getPartsByPrj(prjId)
  const medidotOpt = await getMedidotOpt(prjId)

  const tblData = await query

  return (
    <div>
      <AddNewMedidot prjId={prjId} medidotOpt={medidotOpt} aptOpt={aptOpt} parts={parts} />
      <MedidotTbl data={tblData} key={Math.random()} />
    </div>
  )
}
