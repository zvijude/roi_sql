'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/db/db'
import { daysFromNow } from 'zvijude/dates/funcs'
import { NextRequest, NextResponse } from 'next/server'
import { roleLevels } from '@/db/types'
import { cache } from 'react'
import { $Enums } from '@prisma/client'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export const getUser = cache(async () => {
  const cokis = await cookies()
  const session = cokis.get('user')?.value
  if (!session) return null
  return (await decrypt(session)) as UserCookieType
})

export async function checkUser(user) {
  const userExist = (await isUserExist(user.email)) as any

  if (!userExist) return { msg: 'המשתמש לא קיים במערכת', icon: 'error' }

  if (!userExist.picture) {
    // שמור נתונים מחשבון הגוגל
    await db.user.update({
      where: { email: user.email },
      data: {
        gglName: user.gglName,
        picture: user.picture,
        gglSub: user.gglSub,
      },
    })
  }

  // console.log('userExist', userExist)

  // צור קוקי
  const saveToCookie = {
    id: userExist.id,
    kablanId: userExist.kablanId,
    email: user.email,
    name: userExist.name,
    picture: user.picture,
    role: userExist.role,
    companyId: userExist.companyId,
    projects: userExist.projects,
  }

  // console.log('saveToCookie', saveToCookie)

  const expires = daysFromNow(365)
  const userToken = await encrypt({ ...saveToCookie, expires })

  const cokis = await cookies()
  cokis.set('user', userToken, { expires, httpOnly: true })

  // return saveToCookie
  return redirect('/')
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

export async function userInPrj({ prjId }) {
  const user = await getUser()
  if (!user) return null
  prjId = Number(prjId)

  const res = await db.user.findMany({
    where: {
      id: user.id,
      projects: { some: { id: prjId } },
    },
  })

  if (!res.length) redirect('/') // Not in project
  // if (mngrsOnly && roleLevels[user!.role] < 30) redirect('/app') // In Project, not authorized

  return user
}

export async function isUserExist(email: string) {
  email = email.trim().toLocaleLowerCase()

  const res = await db.user.findFirst({
    where: { email },
    select: {
      id: true,
      kablanId: true,
      email: true,
      name: true,
      role: true,
      companyId: true,
      projects: { select: { id: true, name: true } },
      picture: true,
    },
  })
  return res
}

export type UserCookieType = {
  id: number
  kablanId: number
  email: any
  name: string | null
  picture?: string
  role: $Enums.Role
  companyId: number
  projects: {
    id: number
    name: string
  }[]
}
