import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
  ]

  return (
    <div>
      <div className='flex mb-4'>
        {links.map((link, i) => (
          <Link href={link.href} key={i} className=''>
            {link.title}
          </Link>
        ))}
      </div>

      {children}
    </div>
  )
}
