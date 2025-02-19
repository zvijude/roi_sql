import { db } from '@/sql'
import ProbTable from './tbl'

export default async function Probs({ prjId, filter }) {
  const tblData = await db('_probs').where({ prjId, ...filter })
  return <ProbTable data={tblData} key={filter.status} />
}
