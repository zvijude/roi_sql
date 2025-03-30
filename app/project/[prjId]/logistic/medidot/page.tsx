import { getAllAptOpt } from '@/components/aptOpt/db'
import Medidot from '@/components/medidot'
import { MedidotForm } from '@/components/qr/ui/qrForms/MedidotForm'
import { getMedidotOpt } from '@/components/medidot/db'
import MedidotNav from '@/components/medidot/MedidotNav'
import { getPartsByPrj } from '@/components/setup/part/db'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}
  const medidotOpt = await getMedidotOpt(prjId)
  const aptOpt = await getAllAptOpt(prjId)
  const parts = await getPartsByPrj(prjId)

  return (
    <div className='grid'>
      <MedidotForm prjId={prjId} medidotOpt={medidotOpt} aptOpt={aptOpt} parts={parts} />

      <MedidotNav filter={filter} medidotOpt={medidotOpt} />
      <Medidot prjId={prjId} filter={filter} />
    </div>
  )
}
