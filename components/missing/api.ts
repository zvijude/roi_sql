'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addMiss({ qrId, item, qntt, media }) {
  qrId = Number(qrId)
  const user = await getUser()
  await db('missing').insert({ qrId, item, qntt, createdById: user.id, media })
  revalidatePath('/qr')
}

export async function missCompleted({ id }) {
  const user = await getUser()
  await db('missing').where({ id }).update({ isActive: false, updatedById: user.id, resAt: new Date() })
  revalidatePath('/qr')
}

export async function deleteMiss({ id }) {
  await db('missing').where({ id }).del()
  revalidatePath('/qr')
}

export async function deleteMissOpt({ optVal, path, prjId }) {
  prjId = Number(prjId)

  await db('Project')
    .where({ id: prjId })
    .update({
      missOpt: db.raw('array_remove("missOpt", ?)', [optVal]),
    })

  revalidatePath(path)
}

export async function addMissOpt(prjId, option) {
  prjId = Number(prjId)

  const project = await db('Project').where({ id: prjId }).select('missOpt').first()
  const updatedAptOpt = [...(project.missOpt || []), option]
  const res = await db('Project').where({ id: prjId }).update({ missOpt: updatedAptOpt })

  revalidatePath('/qr')
  return res
}
