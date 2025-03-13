import { db } from '@/sql'
import { dateFilters } from '../filter/formatFilter'
import BgtReqTable from './tbl'

export default async function BgtReq({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_probs').where({ prjId, ...filter, type: 'BGT_REQ' })
  if (date) query.whereRaw(dateFilters[date])

  const tblData = await query
  console.log('tblData: ', tblData)

  return <BgtReqTable data={tblData} key={Math.random()} />
}
