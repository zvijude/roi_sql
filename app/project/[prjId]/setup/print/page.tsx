import PrintTable from '@/lib/qr/ui/print/PrintTable'
import Icon from 'zvijude/icon'
import { getPrjPrintQntt, getProjectName } from '@/db/project/get'
import { getQrs } from '@/lib/qr/db/get'

export default async function print({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  if (!prjId) return null

  const prjName = await getProjectName(prjId)
  const printQntt = await getPrjPrintQntt(prjId)

  const qrs = await getQrs({ prjId })

  return (
    <>
      <h2 className='flex mb-6'>
        <Icon name='print' type='reg' className='size-5' />
        <span className='text-xl font-semibold'>הדפסת ברקודים</span>
      </h2>

      <div className='max-w-'>
        <PrintTable qrs={qrs} prjId={prjId} prjName={prjName} printQntt={printQntt} />
      </div>
    </>
  )
}
