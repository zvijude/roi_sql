import Medidot from '@/components/medidot'
import { getAllMedidotOpt } from '@/components/medidot/db'
import MedidotNav from '@/components/medidot/MedidotNav'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}
  const midotOpt = await getAllMedidotOpt(prjId)

  return (
    <div className='grid'>
      <MedidotNav filter={filter} midotOpt={midotOpt} />
      <Medidot prjId={prjId} filter={filter} />
    </div>
  )
}
