import { db } from '@/sql'
import MissTable from './MissTable'
import { dateFilters } from '../filter/formatFilter'
import { AddNewMedidot } from '../medidot/AddNewMedidot'
import { getAllAptOpt } from '../aptOpt/db'
import { getMedidotOpt } from '../medidot/db'
import { getPartsByPrj } from '../setup/part/db'
import { AddNewMiss } from './AddNewMiss'
import { getMissOpt } from './db'

export default async function Missing({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_miss').where({ prjId, ...filter })
  if (date) query.whereRaw(dateFilters[date])

  const aptOpt = await getAllAptOpt(prjId)
  const parts = await getPartsByPrj(prjId)
  const missOpt = await getMissOpt(prjId)

  const tblData = await query

  return (
    <div>
      <AddNewMiss prjId={prjId} missOpt={missOpt} aptOpt={aptOpt} parts={parts} />
      <MissTable data={tblData} key={Math.random()} />
    </div>
  )
}
