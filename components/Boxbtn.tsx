'use client'

import Link from 'next/link'
import Icon, { IconNames } from 'zvijude/icon'

type Props = {
  txt: string
  href?: string
  icon: IconNames
  isAdmin?: boolean
  role?: 'btn' | 'link'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Boxbtn({ txt, href = '', icon, isAdmin, role = 'link', ...props }: Props) {
  const flip = ['hand-holding-dollar', 'chart-mixed', 'table-list'].includes(icon)

  if (role === 'btn') {
    return (
      <>
        {isAdmin && (
          <button className='boxbtn' {...props}>
            <div>
              <Icon name={icon} className='size-6' type='reg' flip={flip} />
              <p>{txt}</p>
            </div>
          </button>
        )}
      </>
    )
  }

  return (
    <Link href={{ pathname: href }} className='boxbtn'>
      <div>
        <Icon name={icon} className='size-6' type='reg' flip={flip} />
        <p>{txt}</p>
      </div>
    </Link>
  )
}
