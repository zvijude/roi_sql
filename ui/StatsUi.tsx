import { twMerge } from 'tailwind-merge'
import { formatCurrency } from 'zvijude/funcs'

export default function StatsUi({ lbl, stat, onClick, className }: Props) {
  lbl = lbl.replaceAll('-', ' ')
  // stat = lbl.startsWith('סכום') ? formatCurrency(stat) : stat

  return (
    <div
      onClick={onClick}
      className={twMerge(
        `${
          onClick ? 'cursor-pointer hover:shadow-3 active:shadow-1 transition-shadow' : ''
        } bg-white border-b py-2 px-4 rounded-md shadow-1 min-w-35
            mobile:min-w-0 mobile:p-1`,
        className
      )}
    >
      <p className='font-semibold'>{lbl}</p>
      <p className='text-2xl mobile:text-base mt-1'>{stat}</p>
    </div>
  )
}

type Props = {
  lbl: string
  stat: number | string
  onClick?: () => void
  className?: HTMLDivElement['className']
}
