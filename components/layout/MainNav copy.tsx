'use client'

import Link from 'next/link'
import Icon, { IconNames } from 'zvijude/icon'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { getProjectName } from '@/db/project/get'

export default function Nav() {
  const params = useSearchParams()
  const prjId = params.get('prjId')
  const pathname = usePathname()

  const [prjName, setPrjName] = useState<string | undefined>('')

  useEffect(() => {
    if (prjId) {
      getProjectName(prjId).then((name) => setPrjName(name))
    }
  }, [prjId])

  return (
    <>
      {/* Desktop Nav */}
      <nav className='mobile:hidden max-w-[50px] z-[9999] h-screen fixed top-0 right-0 ps-[8px] pe-8 shadow-2 overflow-hidden hover:max-w-48 hover:shadow-8 bg-white transition-all duration-300'>
        <div className='flex items-start flex-col justify-between py-2 h-full'>
          <NavUi prjName={prjName} prjId={prjId} pathname={pathname} />
        </div>
      </nav>
      <div className='mobile:hidden w-[50px]' />

      {/* Mobile Nav */}
      <nav className='desktop:hidden'>
        <div popover='auto' id='mobile-nav' className='pop'>
          <NavUi prjName={prjName} prjId={prjId} pathname={pathname} />
        </div>
        <button
          className='fixed top-0 right-0 bg-white h-10 w-[50px] grid place-items-center border-e border-b'
          popoverTarget='mobile-nav'>
          <Icon name='bars' className='size-4' type='reg' />
        </button>
      </nav>
    </>
  )
}

function NavUi({ prjName, prjId, pathname }) {
  return (
    <>
      <div className='grid gap-4'>
        {topLinks(prjName).map((link, i) => {
          const active = pathname === link.href

          return (
            <div>
              <NavLink link={link} active={active} key={i} />
              {active && link.children && <div className='ms-14 mt-1'>{link.children}</div>}
            </div>
          )
        })}
      </div>

      <div className='grid gap-2 mt-4'>
        {bottomLinks.map((link, i) => {
          const active = pathname === link.href

          return <NavLink link={link} active={active} key={i} iconSize='size-4' />
        })}
      </div>
    </>
  )

  function NavLink({ link, active, iconSize }: { link: any; active: boolean; iconSize?: string }) {
    return (
      <Link
        href={{ pathname: link.href, query: { prjId } }}
        className='flex items-center flex-nowrap gap-5'>
        <span
          className={`size-8 grid place-items-center rounded-xl  ${active ? 'bg-blue-100' : ''}`}>
          <Icon
            name={link.icon}
            className={`${iconSize || 'size-[18px]'} ${active ? 'bg-blue-700 size-4' : ''}`}
            type='sol'
            flip={link.flip}
          />
        </span>
        <p className='text-nowrap font-semibold'>{link.title}</p>
      </Link>
    )
  }
}

const topLinks = (prjName?: string) =>
  [
    { icon: 'city', href: '/', title: 'הפרוייקטים שלי' },
    { icon: 'building', href: '/project', title: `פרויקט ${prjName ?? ''}` },
    { icon: 'clipboard-check', href: '/project/waiting_tasks', title: 'ממתין לאישור' },
    { icon: 'bell', href: '/project/events', title: 'אירועים' },
    { icon: 'triangle-exclamation', href: '/project/problems', title: 'בעיות ביצוע' },
    {
      icon: 'hand-holding-dollar',
      href: '/project/budget_requests',
      title: 'בקשות חריגים',
      flip: true,
    },
    { icon: 'check-double', href: '/project/tasks', title: 'ביצועים' },
    { icon: 'calculator', href: '/project/kablan', title: 'חשבונות קבלנים' },
    { icon: 'arrow-rotate-left', href: '/project/skipped_tasks', title: 'משימות שדולגו' },
  ] as { icon: IconNames; href: string; title: string; flip?: boolean; children?: ReactNode }[]

const bottomLinks = [
  { icon: 'users', href: '/project/setup/users', title: 'בעלי תפקידים' },
  { icon: 'table-list', href: '/project/setup/parts', title: 'כתב כמויות', flip: true },
  { icon: 'screwdriver-wrench', href: '/project/setup/tasks', title: 'שלבי ביצוע' },
  { icon: 'print', href: '/project/setup/print', title: 'הדפסת QR' },
] as { icon: IconNames; href: string; title: string; flip?: boolean }[]

// const topLinks = [
//   { icon: 'city', href: { pathname: '/', query: { prjId } }, title: 'הפרוייקטים שלי' },
//   { icon: 'building', href: '/project', title: `פרויקט ${prjName ?? ''}` },
//   { icon: 'clipboard-check', href: '/project/waiting_tasks', title: 'ממתין לאישור' },
//   { icon: 'bell', href: '/project/events', title: 'אירועים' },
//   { icon: 'triangle-exclamation', href: '/project/problems', title: 'בעיות ביצוע' },
//   {
//     icon: 'hand-holding-dollar',
//     href: '/project/budget_requests',
//     title: 'בקשות חריגים',
//     flip: true,
//   },
//   { icon: 'check-double', href: '/project/tasks', title: 'ביצועים' },
//   { icon: 'calculator', href: '/project/kablan', title: 'חשבונות קבלנים' },
//   { icon: 'arrow-rotate-left', href: '/project/skipped_tasks', title: 'משימות שדולגו' },
// ] as LinksType[]

// const bottomLinks = [
//   { icon: 'users', href: '/project/setup/users', title: 'בעלי תפקידים' },
//   { icon: 'table-list', href: '/project/setup/parts', title: 'כתב כמויות', flip: true },
//   { icon: 'screwdriver-wrench', href: '/project/setup/tasks', title: 'שלבי ביצוע' },
//   { icon: 'print', href: '/project/setup/print', title: 'הדפסת QR' },
// ] as LinksType[]
