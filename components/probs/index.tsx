import { db } from '@/sql'
import ProbTable from './tbl'

export default async function index_probs({ prjId }) {
  const tblData = await db('_probs').where({ prjId })

  return <ProbTable data={tblData} />
}
