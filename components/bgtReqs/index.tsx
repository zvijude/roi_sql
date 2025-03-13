import { db } from '@/sql'
import { formatFilter } from '../filter/formatFilter'
import BgtReqTable from './tbl'

export default async function BgtReq({ prjId, filter }) {
  const query = db('_probs').where({ prjId, type: 'BGT_REQ' })
  await formatFilter({ filter, query })
  const tblData = await query

  return <BgtReqTable data={tblData} key={Math.random()} />
}
