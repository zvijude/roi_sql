'use server'

import { getUser } from '@/auth/authFuncs'
import { revalidatePath } from 'next/cache'
import { db } from '@/sql'

export async function addProject(data) {
  const user = await getUser()

  const prjId = await db('Project')
    .insert({
      name: data.name,
      companyId: user!.companyId,
    })
    .returning('id')

  await db('_prj_user').insert({ prjId: prjId[0].id, userId: user!.id })

  revalidatePath('/')
}

// export async function addPrjPrintQntt(prjId, printQntt) {
//   const res = await db.project.update({
//     where: { id: Number(prjId) },
//     data: { printQntt: { increment: Number(printQntt) } },
//   })

//   return res
// }
