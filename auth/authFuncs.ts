'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/sql'
import { daysFromNow } from 'zvijude/dates/funcs'
import { NextRequest, NextResponse } from 'next/server'
import { cache } from 'react'
import { $Enums, Role } from '@prisma/client'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function checkUserSuspended(user) {
  const cokis = await cookies()

  if (user?.suspended) {
    cokis.delete('user')
    redirect('/auth')
  }
}

export const getUser = cache(async () => {
  const cokis = await cookies()
  const session = cokis.get('user')?.value
  if (!session) return null
  const decryptUser = await decrypt(session)

  const dbUser = await db('User')
    .select('id', 'email', 'name', 'role', 'suspended', 'kablanId', 'companyId')
    .where({ id: decryptUser.id })
    .first()
  if (!dbUser) return redirect('/auth')

  return dbUser
}) as () => Promise<UserDb>

export async function checkUser(user) {
  console.log('checkUser user: ', user)

  const userExist = await db('User').select('id', 'suspended').whereILike('email', user.email).first()
  console.log('checkUser userExist: ', userExist)

  if (!userExist) return { fail: true, msg: 'המשתמש לא קיים' }
  if (userExist.suspended) return { fail: true, msg: 'המשתמש מושהה' }
  await db('User').where({ id: userExist.id }).update({ gglName: user.gglName, picture: user.picture, gglSub: user.gglSub })

  // צור קוקי
  const saveToCookie = {
    id: userExist.id,
  }

  await saveUsercookie(saveToCookie)
  redirect('/')
}

export async function saveUsercookie(cookieUser) {
  const cokis = await cookies()

  const expires = daysFromNow(365)
  const userToken = await encrypt({ ...cookieUser, expires })
  cokis.set('user', userToken, { expires, httpOnly: true })
}

export async function deleteUserCookie() {
  const cokis = await cookies()
  cokis.delete('user')
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('365 days').sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function logout() {
  const cokis = await cookies()
  cokis.delete('user')
  redirect('/auth')
}

export async function updateSession(request: NextRequest) {
  const user = request.cookies.get('user')?.value
  if (!user) return

  // Refresh the user session so it doesn't expire
  const parsed = await decrypt(user)
  parsed.expires = daysFromNow(2)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'user',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}

export async function checkCookie() {
  const cokis = await cookies()
  const user = cokis.get('user')?.value
  if (!user) return null
  const parsed = await decrypt(user)
}

export async function userInPrj({ prjId, userId }) {
  const prj = await db('_prj_user').where({ prjId, userId }).first()
  if (!prj) redirect('/')
}

export async function isUserExist(email: string) {
  email = email.trim().toLocaleLowerCase()
  return await db('User').where({ email }).first()
}

export type UserDb = {
  id: number
  email: string
  name: string
  picture: string
  role: Role
  suspended: boolean
  kablanId: number
  companyId: number
}

// return {
//   id: 87,
//   email: 'sarit@ziv-ins.co.il',
//   name: 'תומר איזון',
//   picture: 'https://avatars.githubusercontent.com/u/10198965?v=4',
//   role: 'AGNT',
// }

// return {
//   id: 70,
//   email: 'sarit@ziv-ins.co.il',
//   name: 'אדי אפריימוב',
//   picture: 'https://avatars.githubusercontent.com/u/10198965?v=4',
//   role: 'AGNT',
// }

// return {
//   id: 54,
//   email: 'sarit@ziv-ins.co.il',
//   name: 'שי חוגה',
//   picture: 'https://avatars.githubusercontent.com/u/10198965?v=4',
//   role: 'MNGR',
// }
