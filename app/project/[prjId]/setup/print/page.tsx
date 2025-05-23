import PrintTable from '@/components/qr/ui/print/PrintTable'
import Icon from 'zvijude/icon'
import { getProjectName } from '@/db/project/get'
import { db } from '@/sql'

export default async function print({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  if (!prjId) return null

  const prjName = await getProjectName(prjId)

  const qrs = await db("_print_qrs").where({ prjId })

  return (
    <>
      <h2 className='flex mb-6'>
        <Icon name='print' type='reg' className='size-5' />
        <span className='text-xl font-semibold'>הדפסת ברקודים</span>
      </h2>

      <div className='max-w-'>
        <PrintTable qrs={qrs} prjId={prjId} prjName={prjName} />
      </div>
    </>
  )
}
