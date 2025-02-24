import Medidot from '@/components/medidot'
import MedidotNav from '@/components/medidot/MedidotNav'

export default async function Events({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  return (
    <div className='grid'>
      <MedidotNav filter={filter} />
      <Medidot prjId={prjId} filter={filter} />
    </div>
  )
}
