import { db } from '@/sql'
import TaskTable from './tbl'
import { dateFilters } from '../filter/formatFilter'

export default async function Tasks({ prjId, filter }) {
  const date = filter.date
  delete filter.date
  let query = db('_tasks').where({ prjId, ...filter })
  if (date) query.whereRaw(dateFilters[date])

  const tblData = await query

  return <TaskTable data={tblData} key={Math.random()} />
}
