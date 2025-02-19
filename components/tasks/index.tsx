import { db } from '@/sql'
import TaskTable from './tbl'

export default async function Tasks({ prjId, filter }) {
  const date = filter.date
  delete filter.date

  let query = db('_tasks').where({ prjId, ...filter })
  if (date) {
    query.whereRaw(dateFilters[date])
  }

  const tblData = await query // db('_tasks').where({ prjId, ...filter })

  return <TaskTable data={tblData} key={Math.random()} />
}
const dateFilters = {
  'החודש הנוכחי': `EXTRACT(MONTH FROM "createdAt") = EXTRACT(MONTH FROM NOW()) 
                    AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())`,
  'החודש הקודם': `EXTRACT(MONTH FROM "createdAt") = EXTRACT(MONTH FROM NOW() - INTERVAL '1 MONTH') 
                   AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW() - INTERVAL '1 MONTH')`,
  'מתחילת השנה': `"createdAt" >= DATE_TRUNC('year', NOW())`,
  'השבוע הנוכחי': `EXTRACT(WEEK FROM "createdAt") = EXTRACT(WEEK FROM NOW()) 
                    AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())`,
  היום: `"createdAt"::DATE = NOW()::DATE`,
  '3 חודשים אחרונים': `"createdAt" >= NOW() - INTERVAL '3 MONTH'`,
}
