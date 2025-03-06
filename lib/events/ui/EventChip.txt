import { eventDic } from '@/db/types'
import Icon, { IconNames } from 'zvijude/icon'

export default function EventChip({ type }) {
  const { cls, icon } = getType(type)

  return (
    <span
      className={`${cls} 
       py-1 px-3 text-center rounded-full font-semibold inline-flex items-center gap-2`}
    >
      <Icon
        name={icon.name as IconNames}
        className={`size-3 ${icon.clr}`}
        type='reg'
        flip={icon.name === 'hand-holding-dollar'}
      />
      <p className='whitespace-nowrap'>{eventDic[type]}</p>
    </span>
  )
}


function getType(type) {
  const typeObj = {
    COMPLETED: {
      cls: 'bg-green-100 text-green-700',
      icon: { name: 'check-double', clr: 'bg-green-700' },
    },
    WAITING: {
      cls: 'bg-blue-100 text-blue-700',
      icon: { name: 'hourglass-half', clr: 'bg-blue-700' },
    },
    SKIPPED: {
      cls: 'bg-gray-100 text-gray-700',
      icon: { name: 'arrow-rotate-left', clr: 'bg-gray-700' },
    },
    CANCELED: {
      cls: 'bg-gray-100 text-gray-700',
      icon: { name: 'trash', clr: 'bg-gray-700' },
    },
    GRANTED: {
      cls: 'bg-green-100 text-green-700',
      icon: { name: 'check-double', clr: 'bg-green-700' },
    },
    DENIED: {
      cls: 'bg-red-100 text-red-700',
      icon: { name: 'ban', clr: 'bg-red-700' },
    },
    SOLVED: {
      cls: 'bg-green-100 text-green-700',
      icon: { name: 'check-double', clr: 'bg-green-700' },
    },
  }

  return typeObj[type]
}

// [EventType.PROB]: {
//   cls: 'bg-red-100 text-red-700',
//   icon: { name: 'triangle-exclamation', clr: 'bg-red-700' },
// },
// [EventType.BGT_REQ]: {
//   cls: 'bg-yellow-100',
//   icon: { name: 'hand-holding-dollar', clr: 'bg-yellow-800' },
// },
