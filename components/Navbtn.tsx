'use client'

import { usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Icon, { IconNames } from 'zvijude/icon'

type Props = {
  txt: string
  href: string
  icon: IconNames
}

export default function Navbtn({ txt, href = '', icon }: Props) {
  const params = useSearchParams()
  const prjId = params.get('prjId')

  const pathname = usePathname()
  const active = pathname === href

  const flip = ['hand-holding-dollar', 'chart-mixed', 'table-list'].includes(icon)

  return (
    <Link
      href={{ pathname: href, query: { prjId } }}
      className={`flex gap-3 desktop:border-l last:border-l-0 h-full px-6 mobile:py-2 mobile:px-8 ${
        active && 'bg-blue-50 text-whit ont-semibold dark:bg-slate-700'
      }`}>
      <Icon name={icon} className="size-4" flip={flip} />
      {txt}
    </Link>
  )
}
