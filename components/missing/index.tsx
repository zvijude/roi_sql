import { db } from '@/sql'
import MissTable from './MissTable'
import { dateFilters } from '../filter/formatFilter'

export default async function Missing({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_miss').where({ prjId, ...filter })
  if (date) query.whereRaw(dateFilters[date])

  const tblData = await query

  return (
    <div className='grid'>
      <MissTable data={tblData} key={Math.random()} />
    </div>
  )
}
