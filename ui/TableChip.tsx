import Icon, { IconNames } from 'zvijude/icon'

type Props = {
  lbl: string
  type: 'success' | 'error' | 'warning' | 'info' | 'canceled'
}

export default function TableChip({ lbl, type }: Props) {
  const { cls, icon } = typeClasses[type]

  return (
    <span
      className={`${cls} 
       py-1 px-4 text-center rounded-full font-semibold inline-flex items-center gap-2`}>
      <Icon
        name={icon.name}
        className={`size-3 ${icon.clr}`}
        type="reg"
        flip={icon.name === 'hand-holding-dollar'}
      />
      <p className="whitespace-nowrap">{lbl}</p>
    </span>
  )
}

const typeClasses: Record<string, { cls: string; icon: { name: IconNames; clr: string } }> = {
  error: {
    cls: 'bg-red-100 text-red-700',
    icon: { name: 'triangle-exclamation', clr: 'bg-red-700' },
  },
  info: {
    cls: 'bg-slate-100',
    icon: { name: 'hand-holding-dollar', clr: 'bg-slate-800' }, //! change to 'info' icon
  },
  success: {
    cls: 'bg-green-100 text-green-700',
    icon: { name: 'circle-check', clr: 'bg-green-700' },
  },
  warning: {
    cls: 'bg-yellow-100 text-yellow-700',
    icon: { name: 'triangle-exclamation', clr: 'bg-yellow-700' },
  },
  default: {
    cls: 'bg-gray-100',
    icon: { name: 'triangle-exclamation', clr: 'bg-red-700' },
  },
  canceled: {
    cls: 'bg-gray-100',
    icon: { name: 'xmark-large', clr: 'bg-gray-700' },
  }
}
