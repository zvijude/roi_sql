import { db } from '@/sql'
import TaskTable from './tbl'

export default async function index_tasks({ prjId }) {
  const tblData = await db('_tasks').where({ prjId })

  return <TaskTable data={tblData} />
}
