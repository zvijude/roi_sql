import QrBox from '@/lib/periodicTable/ui/QrBox'
import { Btn } from 'zvijude/btns'

export default function PeriodicTable({ qrsData, prjId }) {
  const floors = Object.keys(qrsData)
    .map(Number)
    .sort((a, b) => b - a)
  return (
    <div className='p-8 rounded-md bg-white shadow mobile:p-4'>
      <Btn lbl='סנן' popoverTarget='periodic-filter' className='my-2' icon='filter' />

      <div className='grid gap-4'>
        {floors.map((floor) => (
          <div key={floor}>
            {/* Floor label column */}
            <p className='text-lg mobile:text-base font-semibold text-gray-800 mb-1'>קומה {floor}</p>

            {/* Boxes column */}
            <div className='flex flex-wrap gap-2 mobile:gap-1'>
              {Object.keys(qrsData[floor]).map((aptNum) => (
                <div key={aptNum} className='border p-2 mobile:p-1 rounded-md flex flex-col gap-2 mobile:gap-1 items-center'>
                  <p className='font-semibold text-gray-800'>דירה {aptNum}</p>
                  <div className='flex flex-wrap justify-center gap-2 mobile:gap-1'>
                    {qrsData[floor][aptNum].map((qr) => (
                      <QrBox qr={qr} prjId={prjId} key={qr.qrNum} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
