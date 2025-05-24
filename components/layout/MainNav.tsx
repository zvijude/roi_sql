'use client'

import { logout } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { useUser } from '@/utils/userCtx'
import { Role } from '@/db/types'

import SideNav, { LinksType } from './SideNav'

export default function MainNav({ prjId, prjName }) {
  const logmeout = () => logout()

  const { topLinks, bottomLinks } = getLinks(prjName, prjId)

  return <SideNav topLinks={topLinks} bottomLinks={bottomLinks} logout={logmeout} />
}

function calcUrl(prjId, user) {
  if (user.role === Role.INSTALLER || user.role === Role.C_INSTALLER) return []
  if (user.role === Role.KABLAN)
    return [
      {
        icon: 'calculator',
        href: `/project/${prjId}/kablan/${user.id}`,
        title: 'החשבון שלי',
      },
    ]
  return [
    { icon: 'calculator', href: `/project/${prjId}/kablan`, title: 'חשבונות קבלנים' },
    // { icon: 'ruler-triangle', type: 'reg', flip: true, href: `/project/${prjId}/logistic/medidot`, title: 'מדידות' },
  ]
}

function getLinks(prjName?: string, prjId?: string | null) {
  const { user } = useUser() as any
  const topLinks = [
    // section 1
    { icon: 'city', href: '/', title: 'הפרוייקטים שלי' },
    { icon: 'building', href: `/project/${prjId}`, title: `פרויקט ${prjName}` },
    { icon: 'map-location-dot', href: `/project/${prjId}/map_qrs`, title: `מפת הפרויקט` },
    { icon: 'hammer', href: `/project/${prjId}/events/tasks`, title: 'משימות' },

    // section 2
    { icon: 'notdef', type: 'reg', flip: true, href: `/project/${prjId}/logistic/missing`, title: 'חוסרים' },
    { icon: 'scale-balanced', type: 'reg', flip: true, href: `/project/${prjId}/logistic/medidot`, title: 'מדידות' },
    { icon: 'map', href: `/project/${prjId}/glass`, title: `מיפוי זכוכיות` },

    //section 3
    { icon: 'triangle-exclamation', href: `/project/${prjId}/events/problems`, title: 'בעיות ביצוע' },
    { icon: 'hand-holding-dollar', href: `/project/${prjId}/events/budget_requests`, flip: true, title: 'בקשות חריגים' },

    ...calcUrl(prjId, user),
  ] as LinksType[]

  let bottomLinks = [] as any
  if (isManager(user.role)) {
    topLinks.push({ icon: 'gear', href: `/project/${prjId}/setup/users`, title: 'הגדרות פרויקט' })
  }

  return { topLinks, bottomLinks }
}

// if (isManager(user.role)) {
//   bottomLinks = [{ icon: 'gear', href: `/project/${prjId}/setup/users`, title: 'הגדרות' }] as LinksType[]
// }
