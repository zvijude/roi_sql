'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '../db'
import { revalidatePath } from 'next/cache'
import { onErr } from '../errors'

export async function addProject(data) {
  const user = await getUser()

  const projects = await db.project
    .create({
      data: {
        name: data.name,
        companyId: user!.companyId,
        users: { connect: { id: user!.id } },
      },
    })
    .catch(onErr)

  revalidatePath('/')

  return projects
}

export async function addPrjPrintQntt(prjId, printQntt) {
  const res = await db.project.update({
    where: { id: Number(prjId) },
    data: { printQntt: { increment: Number(printQntt) } },
  })

  return res
}
