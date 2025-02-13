'use client'
import { ProbStatus } from '@prisma/client'
import { formatDateTime } from 'zvijude/dates/funcs'
import { formatCurrency } from 'zvijude/funcs'
import Icon, { IconNames } from 'zvijude/icon'
import SelectEventStatus from './SelectEventStatus'
import ImgsCom from '@/lib/imgsCom'
import { EventType } from '@/db/types'

export default function EventPop({ item, type }) {
  if (!item.id) return null
  const { title, icon } = titleIconDic[type]

  return (
    <div className='bg-white rounded-md p-4 shadow-md'>
      <div className='flex justify-between'>
        <section className='flex mb-4'>
          <Icon name={icon as IconNames} type='reg' flip={icon === 'hand-holding-dollar'} />
          <p className='text-lg font-semibold'>{title}</p>
          <p className='ml-2'>{item.status}</p>
        </section>
        <SelectEventStatus item={item} />
      </div>
      <div className='grid gap-2'>
        {item.desc && (
          <section className='mb-2'>
            <p>{item.desc}</p>
            {item.amount && <p>עלות החריגה {formatCurrency(item.amount)}</p>}
            <div className='flex gap-2 mt-3'>
              <ImgsCom urls={item.media} />
            </div>
          </section>
        )}
        <section>
          <p>
            נוצר ע"י {item.createdBy?.name}, ב- {formatDateTime(item.date)}
          </p>
          <p>ב{item.qr?.loc}</p>
        </section>

        <section>
          <p>פרט {item.qr?.part?.name}</p>
          <p>{item.qr?.part?.desc}</p>
        </section>

        <section>
          <p>משימה {item.task?.title}</p>
          <p>{item.task?.desc}</p>
          <p>מחיר {formatCurrency(item.task?.price)}</p>
          <div className='flex gap-2 mt-3'>
            <ImgsCom urls={item.task?.media} />
          </div>
        </section>
        {/* {item.task.note && (
          <section>
            <p>הערת המבצע: {item.task.note}</p>
          </section>
        )} */}
      </div>
    </div>
  )
}

// const probStatusDic = {
//   [ProbStatus.WAITING]: 'ממתינה לפתרון',
//   [ProbStatus.SOLVED]: 'פתורה',
//   [ProbStatus.CANCELED]: 'בוטלה',
//   [ProbStatus.DENIED]: 'נדחתה',
//   [ProbStatus.GRANTED]: 'אושרה',
// }

const titleIconDic = {
  [EventType.PROB]: { title: 'בעית ביצוע', icon: 'triangle-exclamation' },
  [EventType.BGT_REQ]: { title: 'בקשת חריגים', icon: 'hand-holding-dollar' },
  [EventType.COMPLETED]: { title: 'משימה הושלמה', icon: 'check-double' },
  [EventType.SKIPPED]: { title: 'משימה דולגה', icon: 'arrow-rotate-left' },
  [EventType.WAITING]: { title: 'משימה ממתינה לאישור', icon: 'hourglass-half' },
}
