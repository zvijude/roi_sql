import { db } from '@/sql'
import MedidotTbl from './MedidotTbl'

export default async function Medidot({ prjId, filter }) {
  const data = await db('_medidot').where({ prjId })

  return (
    <div>
      <MedidotTbl data={data} />
    </div>
  )
}
