'use client'

import { qrStatusDic } from '@/db/types'
import { popWindow } from '@/ui/popWindow'
import { QrStatus } from '@prisma/client'
import Icon from 'zvijude/icon'

const bgColors = {
  [QrStatus.FINISH]: 'bg-green-100',
  [QrStatus.ON_BGT_REQ]: 'bg-yellow-200',
  [QrStatus.ON_PROB]: 'bg-red-300',
  [QrStatus.WAITING_TASK]: 'bg-orange-200',
}

// const hoverTexts = {
//   [QrStatus.FINISH]: 'כל המשימות של הברקוד הסתיימו',
//   [QrStatus.IN_PROGRESS]: 'ברקוד בתהליך עבודה',
//   [QrStatus.ON_BGT_REQ]: 'בקשת חריגת תקציב פתוחה',
//   [QrStatus.ON_PROB]: 'בעיה פתוחה',
//   [QrStatus.WAITING_TASK]: 'משימה ממתינה לאישור',
// }

export default function QrBox({ qr, prjId }) {
  return (
    <div className='relative group inline-block'>
      <button
        onClick={() => popWindow(`/pops/project/${prjId}/qr/${qr.qrNum}`)}
        className={`${
          bgColors[qr.status]
        } p-2.5 mobile:size-[52px] text-sm text-center cursor-pointer hover:scale-125 transition-all shadow-2 rounded-md`}
      >
        <div className='mobile:hidden justify-self-center'>
          {qr.status !== QrStatus.FINISH ? (
            <p>
              שלב {qr.totalTasksCompleted + 1}/{qr.totalTasksCount}
            </p>
          ) : (
            <Icon name='check' className='size-5' />
          )}
        </div>
        <p className='px-1'>QR {qr.qrNum}</p>
      </button>
      <div
        // hover text
        className='
         absolute -top-8 left-1/2 -translate-x-1/2
         whitespace-nowrap
       bg-gray-800 text-white
         text-xs px-3 py-1
         rounded-md opacity-0
         group-hover:opacity-100 pointer-events-none'
      >
        {qrStatusDic[qr.status]}
      </div>
    </div>
  )
}
