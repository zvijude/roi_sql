import { db } from '@/sql'
import MedidotTbl from './MedidotTbl'
import { dateFilters } from '../filter/formatFilter'

export default async function Medidot({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_medidot').where({ prjId, ...filter })
  if (date) query.whereRaw(dateFilters[date])

  const tblData = await query

  return (
    <div>
      <MedidotTbl data={tblData} key={Math.random()} />
    </div>
  )
}
