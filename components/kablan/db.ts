import { db } from '@/sql'
import { Role } from '@prisma/client'
import { getUser } from '@/auth/authFuncs'
import { redirect } from 'next/navigation'
import { isInstaller } from '@/db/types'

export async function checkKablan(prjId, kablanId) {
  // 1. if user exists
  const user = await getUser()
  if (!user) return redirect('/auth')

  // 2. if user is a different kablan
  if (user.role === Role.KABLAN && user.id !== kablanId) redirect(`/project/${prjId}/kablan/${user.id}`)

  // 3. if user is an installer
  if (isInstaller(user.role)) redirect(`/project/${prjId}`)

  // 4. if kablan exists in project
  //! need to check if kablan exists in project

  return user
}


export async function getKablansNames(prjId: number) {
  prjId = Number(prjId)
  return await db('User').where({ role: Role.KABLAN }).select('id', 'name', 'phone', 'email')
}
