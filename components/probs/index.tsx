import { db } from '@/sql'
import ProbTable from './tbl'
import { formatFilter } from '../filter/formatFilter'

export default async function Probs({ prjId, filter }) {
  const query = db('_probs').where({ prjId, type: 'PROB' })
  await formatFilter({ filter, query })
  const tblData = await query

  return <ProbTable data={tblData} key={Math.random()} />
}
