'use server'

import { db as pdb } from '@/db/db'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'
import { Role } from '@prisma/client'
import { getUser, isUserExist } from '@/auth/authFuncs'

// add user
export async function addUser(prjId: number, data: TAddUser) {
  const user = await getUser() // get the current user for company

  // const isUser = await isUserExist(data.email)
  // if (isUser) return connectExistingUser(prjId, isUser.email)

  const res = (await db('User')
    .insert({
      companyId: 1,
      ...data,
      email: data.email.toLowerCase(),
      kablanId: Number(data.kablanId) || null,
    })
    .returning('id')) as any

  const newId = res[0].id

  if (res) await db('_prj_user').insert({ prjId, userId: newId })

  if (data.role === Role.KABLAN) {
    await db('User').where({ id: newId }).update({ kablanId: newId })
  }

  revalidatePath('/project/setup/users')
  return res
}

//add company
export async function addCompany(data: any) {
  const companyName = data.companyName.trim()
  delete data.companyName

  const user = await db.user.create({
    data: {
      role: Role.ADMIN,
      ...data,
      company: {
        create: {
          name: companyName,
        },
      },
    },
  })

  revalidatePath('/')
  return user
}

// delete
export async function deleteUser(id: number, role: Role, prjId: number) {
  prjId = Number(prjId)

  // if (role === Role.KABLAN) {
  //   const hasInstallers = await db.user.findFirst({
  //     where: { kablanId: id, projects: { some: { id: prjId } } },
  //   })
  //   if (hasInstallers) return { failed: true, msg: 'לא ניתן למחוק קבלן בעל מתקינים' }
  // }

  // const isUserHasTasks = await db.completedTask.findFirst({
  //   where: { createdById: id, prjId },
  // })
  // if (isUserHasTasks) return { failed: true, msg: 'לא ניתן למחוק משתמש עם משימות שהושלמו' }

  // await db.user
  //   .update({
  //     where: { id },
  //     data: { projects: { disconnect: { id: prjId } } },
  //   })

  await db('_prj_user').where({ userId: id, prjId }).del()
  await db('User').where({ id }).del()
   

  revalidatePath('/project')
  return { failed: false, msg: `משתמש ${id} נמחק בהצלחה` }
}

// update
export async function editUser(userToUpdate: TUpdateUser, userOld: any, prjId: number) {
  prjId = Number(prjId)

  const id = userToUpdate.id
  delete userToUpdate.id

  if (userOld.curRole === Role.KABLAN && userToUpdate.role !== Role.KABLAN) {
    const hasInstallers = await db.user.findFirst({ where: { kablanId: id } })
    if (hasInstallers) return { failed: true, msg: 'לא ניתן לשנות קבלן בעל מתקינים' }
  }

  if (userOld.role === Role.INSTALLER) {
    if (userToUpdate.role !== Role.INSTALLER || Number(userToUpdate.kablanId) !== userOld.kablanId) {
      const isUserHasTasks = await db.completedTask.findFirst({
        where: { createdById: id, prjId },
      })
      if (isUserHasTasks) return { failed: true, msg: 'לא ניתן לשנות מתקין עם משימות שהושלמו' }
    }
  }

  const res = await db.user
    .update({
      where: { id },
      data: { ...userToUpdate, kablanId: Number(userToUpdate.kablanId) },
    })
    .catch((e: any) => {
      return { failed: true, msg: `שגיאה בעדכון המשתמש ${e}` }
    })

  revalidatePath('/project/setup/users')
  return res
}

// update - connect existing user
export async function connectExistingUser(prjId: number, email: string) {
  prjId = Number(prjId)
  const user = (await isUserExist(email)) as any
  if (!user) return { failed: true, msg: `המשתמש ${email} לא קיים במערכת. צור חדש` } // case 1

  const isInCurPrj = user.projects.find((prj: any) => prj.id === prjId)
  if (isInCurPrj) return { failed: true, msg: `המשתמש ${user.name} כבר קיים בפרויקט` } // case 2

  await db.user
    .update({
      where: { email: user.email },
      data: {
        projects: { connect: [{ id: prjId }] },
      },
    })
    .catch((e: any) => {
      return { failed: true, msg: `שגיאה בחיבור המשתמש ${e}` }
    })

  revalidatePath('/project/setup/users')
  return { failed: false, msg: `המשתמש ${user.name} חובר בהצלחה לפרוקיט` } // case 3
}

type TAddUser = {
  firstName: string
  lastName: string
  role: Role
  kablanId?: number
  email: string
  phone: string | null
}

type TUpdateUser = {
  id?: number
  firstName: string
  lastName: string
  role: Role
  kablanId?: number
  email: string
  phone: string | null
}
