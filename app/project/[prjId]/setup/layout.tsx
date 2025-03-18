import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Btn } from 'zvijude/btns'

export default async function SetupLayout({ children, params }) {
  const { prjId } = await params
  const user = await getUser()
  if (!isManager(user.role)) return redirect('/')

  const links = [
    { icon: 'users', href: `/project/${prjId}/setup/users`, title: 'בעלי תפקידים' },
    {
      icon: 'table-list',
      href: `/project/${prjId}/setup/parts`,
      title: 'כתב כמויות',
      flip: true,
    },
    { icon: 'screwdriver-wrench', href: `/project/${prjId}/setup/tasks`, title: 'שלבי ביצוע' },
    { icon: 'print', href: `/project/${prjId}/setup/print`, title: 'הדפסת QR' },
  ] as any

  return (
    <div>
      <div className='flex'>
        {links.map((link, i) => (
          <Btn href={link.href} key={i} className='' lbl={link.title} clr='soft' icon={link.icon} />
        ))}
      </div>
      <div className='w-full h-px bg-slate-300 my-4' />

      {children}
    </div>
  )
}
