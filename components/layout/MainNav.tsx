'use client'

import { logout } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { useUser } from '@/utils/userCtx'
import { Role } from '@prisma/client'

import SideNav, { LinksType } from './SideNav'

export default function MainNav({ prjId, prjName }) {
  const logmeout = () => logout()

  const { topLinks, bottomLinks } = getLinks(prjName, prjId)

  return <SideNav topLinks={topLinks} bottomLinks={bottomLinks} logout={logmeout} />
}
function calcUrl(prjId, user) {
  if (user.role === Role.INSTALLER || user.role === Role.C_INSTALLER)
    return {
      icon: '',
      href: ``,
      title: '',
    }
  if (user.role === Role.KABLAN)
    return {
      icon: 'calculator',
      href: `/project/${prjId}/kablan/${user.id}`,
      title: 'החשבון שלי',
    }
  return { icon: 'calculator', href: `/project/${prjId}/kablan`, title: 'חשבונות קבלנים' }
}

function getLinks(prjName?: string, prjId?: string | null) {
  const { user } = useUser() as any
  const topLinks = [
    { icon: 'city', href: '/', title: 'הפרוייקטים שלי' },
    { icon: 'building', href: `/project/${prjId}`, title: `פרויקט ${prjName ?? ''}` },
    { icon: 'chart-line', href: `/project/${prjId}/dash`, title:'גרפים' },
    { icon: 'bell', href: `/project/${prjId}/events`, title: 'אירועים' },
    { icon: 'check-double', href: `/project/${prjId}/tasks`, title: 'ביצועים' },
    { icon: 'hourglass-half', href: `/project/${prjId}/waiting_tasks`, title: 'ממתין לאישור' },
    calcUrl(prjId, user),
    {
      icon: 'hand-holding-dollar',
      href: `/project/${prjId}/budget_requests`,
      title: 'בקשות חריגים',
      flip: true,
    },
    { icon: 'triangle-exclamation', href: `/project/${prjId}/problems`, title: 'בעיות ביצוע' },

    { icon: 'arrow-rotate-left', href: `/project/${prjId}/skipped_tasks`, title: 'משימות שדולגו' },
  ] as LinksType[]

  let bottomLinks = [] as any
  if (isManager(user.role)) {
    bottomLinks = [
      { icon: 'users', href: `/project/${prjId}/setup/users`, title: 'בעלי תפקידים' },
      {
        icon: 'table-list',
        href: `/project/${prjId}/setup/parts`,
        title: 'כתב כמויות',
        flip: true,
      },
      { icon: 'screwdriver-wrench', href: `/project/${prjId}/setup/tasks`, title: 'שלבי ביצוע' },
      { icon: 'print', href: `/project/${prjId}/setup/print`, title: 'הדפסת QR' },
    ] as LinksType[]
  }

  return { topLinks, bottomLinks }
}
