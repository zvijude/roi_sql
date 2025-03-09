import { db } from '@/sql'
import { Role } from '@prisma/client'
import { getUser, userInPrj } from '@/auth/authFuncs'
import { redirect } from 'next/navigation'
import { isInstaller, isManager } from '@/db/types'

export async function checkKablan(prjId, kablanId) {
  // 1. if user exists
  const user = await getUser()
  if (!user) return redirect('/auth')

  await userInPrj({ prjId, userId: user.id })

  if (isManager(user.role)) return user

  // 2. if user is not this kablan
  if (user.id !== kablanId) redirect(`/project/${prjId}`)

  // 4. if kablan exists in project
  //! need to check if kablan exists in project

  return user
}

export async function getKablansNames(prjId: number) {
  prjId = Number(prjId)
  return await db('User').where({ role: Role.KABLAN }).select('id', 'name', 'phone', 'email')
}

export async function getAllKablan(prjId) {
  prjId = Number(prjId)
  const res = await db.raw(`SELECT * FROM f_all_kablan(?)`, [prjId])
  return res.rows
}

export async function getKablanStats(prjId, kablanId) {
  const res = await db.raw(`SELECT * FROM f_all_kablan(?, ?)`, [prjId, kablanId])
  return res.rows[0]
}

export async function getKablan(prjId, kablanId) {
  prjId = Number(prjId)
  kablanId = Number(kablanId)
  const res = await db.raw(`SELECT * FROM f_single_kablan(?, ?)`, [prjId, kablanId])
  return res.rows
}
