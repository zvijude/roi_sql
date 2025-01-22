import { eventTypeDic } from '@/db/types'
import { EventType } from '@prisma/client'
import Icon, { IconNames } from 'zvijude/icon'

export default function EventChip({ type }) {
  const { cls, icon } = getType(type)

  return (
    <span
      className={`${cls} 
       py-1 px-3 text-center rounded-full font-semibold inline-flex items-center gap-2`}>
      <Icon
        name={icon.name}
        className={`size-3 ${icon.clr}`}
        type="reg"
        flip={icon.name === 'hand-holding-dollar'}
      />
      <p className="whitespace-nowrap">{eventTypeDic[type]}</p>
    </span>
  )
}

function getType(type): { cls: string; icon: { name: IconNames; clr: string } } {
  const typeObj = {
    [EventType.PROB]: {
      cls: 'bg-red-100 text-red-700',
      icon: { name: 'triangle-exclamation', clr: 'bg-red-700' },
    },
    [EventType.BGT_REQ]: {
      cls: 'bg-yellow-100',
      icon: { name: 'hand-holding-dollar', clr: 'bg-yellow-800' },
    },
    [EventType.COMPLETED]: {
      cls: 'bg-green-100 text-green-700',
      icon: { name: 'check-double', clr: 'bg-green-700' },
    },
    [EventType.WAITING]: {
      cls: 'bg-blue-100 text-blue-700',
      icon: { name: 'hourglass-half', clr: 'bg-blue-700' },
    },
    [EventType.SKIPPED]: {
      cls: 'bg-gray-100 text-gray-700',
      icon: { name: 'arrow-rotate-left', clr: 'bg-gray-700' },
    },
  }

  return typeObj[type]

  // switch (type) {
  //   case EventType.PROB:
  //     return {
  //       cls: 'bg-red-100 text-red-700',
  //       icon: { name: 'triangle-exclamation', clr: 'bg-red-700' },
  //     }

  //   case EventType.BGT_REQ:
  //     return { cls: 'bg-yellow-100', icon: { name: 'hand-holding-dollar', clr: 'bg-yellow-800' } }

  //   case EventType.COMPLETED:
  //     return {
  //       cls: 'bg-green-100 text-green-700',
  //       icon: { name: 'check-double', clr: 'bg-green-700' },
  //     }

  //   case EventType.WAITING:
  //     return {
  //       cls: 'bg-blue-100 text-blue-700',
  //       icon: { name: 'hourglass-half', clr: 'bg-blue-700' },
  //     }

  //   case EventType.SKIPPED:
  //     return {
  //       cls: 'bg-gray-100 text-gray-700',
  //       icon: { name: 'arrow-rotate-left', clr: 'bg-gray-700' },
  //     }

  //   default:
  //     return { cls: 'bg-gray-100', icon: { name: 'triangle-exclamation', clr: 'bg-red-700' } }
  // }
}
