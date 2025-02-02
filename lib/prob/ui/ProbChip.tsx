import { ProbStatus } from '@prisma/client'
import Icon, { IconNames } from 'zvijude/icon'

export default function ProbChip({ status }) {
  const { cls, icon } = getType(status)

  return (
    <span
      className={`${cls} 
       py-1 px-3 text-center rounded-full font-semibold inline-flex items-center gap-2`}
    >
      <Icon name={icon.name} className={`size-3 ${icon.clr}`} flip={icon.name === 'hand-holding-dollar'} />
      <p className='whitespace-nowrap'>{status}</p>
    </span>
  )
}

function getType(status): { cls: string; icon: { name: IconNames; clr: string } } {
  const typeObj = {
    [ProbStatus.DENIED]: {
      cls: 'bg-red-100 text-red-700',
      icon: { name: 'triangle-exclamation', clr: 'bg-red-700' },
    },
    [ProbStatus.WAITING]: {
      cls: 'bg-yellow-100',
      icon: { name: 'hand-holding-dollar', clr: 'bg-yellow-800' },
    },
    [ProbStatus.CANCELED]: {
      cls: 'bg-green-100 text-green-700',
      icon: { name: 'check-double', clr: 'bg-green-700' },
    },
    [ProbStatus.GRANTED]: {
      cls: 'bg-blue-100 text-blue-700',
      icon: { name: 'hourglass-half', clr: 'bg-blue-700' },
    },
    [ProbStatus.SOLVED]: {
      cls: 'bg-gray-100 text-gray-700',
      icon: { name: 'arrow-rotate-left', clr: 'bg-gray-700' },
    },
  }

  return typeObj[status]

  // switch (status) {
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
