'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'
import { getUser } from '@/auth/authFuncs'
import { Role } from '@prisma/client'
import { isManager } from '@/db/types'

export async function getUsers({ prjId }) {
  const user = await getUser()
  if (!isManager(user!.role)) return false // Only managers can view users

  const res = await db.project.findUnique({
    where: { id: Number(prjId) },
    select: {
      users: {
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          role: true,
          kablanId: true,
          email: true,
          phone: true,
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  })

  return res?.users
}

export async function getCurUserQuery() {
  const user = (await getUser()) as any

  if (user.role === Role.INSTALLER || user.role === Role.C_INSTALLER) return { createdById: user.id }
  if (user.role === Role.KABLAN) return { kablanId: user.id }
  return {}
}
