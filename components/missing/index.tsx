import { db } from '@/sql'
import MissTable from './MissTable'

export default async function Missing({ prjId, filter }) {
  const data = await db('_miss').where({ prjId })

  return (
    <div>
      <MissTable data={data} />
    </div>
  )
}
