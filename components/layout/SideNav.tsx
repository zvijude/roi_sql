'use client'

import Link from 'next/link'
import Icon, { IconNames } from 'zvijude/icon'
import { usePathname } from 'next/navigation'

type Props = {
  topLinks: LinksType[]
  bottomLinks: LinksType[]
  open?: boolean
  logout?: () => void
  children?: React.ReactNode
  className?: string
}

export default function SideNav({
  topLinks,
  bottomLinks,
  open = false,
  logout,
  children,
  className,
}: Props) {
  let cls =
    'max-w-[50px] z-[9999] ps-2 pe-8 overflow-hidden hover:max-w-60 hover:shadow-8 transition-all duration-300'
  if (open) cls = 'ps-2 pe-6 max-w-60'

  return (
    <>
      {/* Desktop Nav */}
      <div className="mobile:hidden">
        <nav
          className={`overflow-y-auto hide-scrollbar hover:scrollbar-thin py-4 shadow-2 bg-white h-screen fixed top-0 right-0 ${cls} ${className}`}>
          <div className="flex flex-nowrap items-start flex-col justify-between h-full">
            <NavUi
              topLinks={topLinks}
              bottomLinks={bottomLinks}
              logout={logout}
              children={children}
            />
          </div>
        </nav>
      </div>
      {/* <div className='mobile:hidden' /> */}

      {/* Mobile Nav */}
      <nav className="desktop:hidden">
        <div popover="auto" id="mobile-nav" className="pop">
          <NavUi
            topLinks={topLinks}
            bottomLinks={bottomLinks}
            logout={logout}
            children={children}
          />
        </div>

        <button
          className="fixed top-0 right-0 bg-white h-10 w-[50px] grid place-items-center border-e border-b"
          popoverTarget="mobile-nav">
          <Icon name="bars" className="size-4" type="reg" />
        </button>
      </nav>
    </>
  )
}

function NavUi({
  topLinks,
  bottomLinks,
  logout,
  children,
}: {
  topLinks: LinksType[]
  bottomLinks: LinksType[]
  logout?: () => void
  children?: React.ReactNode
}) {
  return (
    <>
      <div>
        {children}

        <div className="grid gap-4">
          {topLinks.map((link, i) => {
            return <NavLink link={link} key={i} />
          })}
        </div>
      </div>

      <div className="grid gap-2 mt-4">
        {bottomLinks.map((link, i) => {
          return <NavLink link={link} key={i} iconSize="size-4" />
        })}
        {logout && <LogoutBtn logout={logout} />}
      </div>
    </>
  )

  function NavLink({ link, iconSize }: { link: any; iconSize?: string }) {
    const pathname = usePathname()
    const active = pathname === link?.href

    return (
      <Link
        onClick={() => document.getElementById('mobile-nav')?.hidePopover()}
        href={{ pathname: link?.href, query: link?.query }}
        className="flex items-center flex-nowrap gap-5">
        <span className={`size-8 grid place-items-center rounded-xl  ${active ? 'bg-soft' : ''}`}>
          <Icon
            name={link?.icon}
            className={`${iconSize || 'size-[18px]'} ${active ? 'bg-solid size-4' : ''}`}
            type="sol"
            flip={link?.flip}
          />
        </span>
        <p className={`text-nowrap font-semibold ${active ? 'text-solid' : ''}`}>{link?.title}</p>
      </Link>
    )
  }
}

function LogoutBtn({ logout }: { logout: () => void }) {
  return (
    <button onClick={logout} className="flex items-center flex-nowrap gap-5">
      <span className="size-8 grid place-items-center rounded-xl">
        <Icon name="right-from-bracket" type="sol" className="size-4" />
      </span>
      <p className="text-nowrap font-semibold">התנתקות</p>
    </button>
  )
}

export type LinksType = {
  icon: IconNames
  href: string
  query?: { [key: string]: string | number }
  title: string
  flip?: boolean
}

// {active && link.children && <div className='ms-14 mt-1'>{link.children}</div>}
