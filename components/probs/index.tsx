import { db } from '@/sql'
import ProbTable from './tbl'
import { dateFilters } from '../filter/formatFilter'

export default async function Probs({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_probs').where({ prjId, ...filter })
  if (date) query.whereRaw(dateFilters[date])

  const tblData = await query
  console.log('tblData: ', tblData)

  return <ProbTable data={tblData} key={Math.random()} />
}
