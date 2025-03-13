import { db } from '@/sql'
import TaskTable from './tbl'
import { formatFilter } from '../filter/formatFilter'

export default async function Tasks({ prjId, filter }) {
  const query = db('_tasks').where({ prjId })
  await formatFilter({ filter, query })
  const tblData = await query

  return <TaskTable data={tblData} key={Math.random()} />
}
