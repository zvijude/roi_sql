import { twMerge } from 'tailwind-merge'

export default function StatsUi({ lbl, stat, onClick, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        `${
          onClick ? 'cursor-pointer hover:shadow-3 active:shadow-1 transition-shadow' : ''
        } bg-white border-b py-2 px-4 rounded-md shadow-1 min-w-35
            mobile:min-w-0 mobile:p-1`,
        className
      )}>
      <p className='text-slate-700 mobile:text-xs'>{lbl}</p>
      <p className='text-lg mobile:text-sm font-semibold'>{stat}</p>
    </div>
  )
}

type Props = {
  lbl: string
  stat: number | string
  onClick?: () => void
  className?: HTMLDivElement['className']
}
