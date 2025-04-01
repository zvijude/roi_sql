import { getAllAptOpt } from '@/components/aptOpt/db'
import Missing from '@/components/missing'
import { MissForm } from '@/components/qr/ui/qrForms/MissForm'
import { getMissOpt } from '@/components/missing/db'
import MissingNav from '@/components/missing/MissingNav'
import { getPartsByPrj } from '@/components/setup/part/db'

export default async function Page({ params, searchParams }) {
  let { prjId } = await params
  let { filter } = await searchParams
  filter = filter ? JSON.parse(filter) : {}

  const missOpt = await getMissOpt(prjId)
  const aptOpt = await getAllAptOpt(prjId)
  const parts = await getPartsByPrj(prjId)

  return (
    <>
      <MissForm prjId={prjId} missOpt={missOpt} aptOpt={aptOpt} parts={parts} />

      <MissingNav filter={filter} itemOpt={missOpt} />
      <Missing prjId={prjId} filter={filter} />
    </>
  )
}
