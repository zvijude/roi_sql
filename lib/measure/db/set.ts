'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addMeasure({ qrId, item, data }) {
  qrId = Number(qrId)
  const user = await getUser()
  await db('measure').insert({ qrId, item, createdById: user.id, ...data })
  revalidatePath('/qr')
}

export async function deleteMeasure({ id }) {
  await db('measure').where({ id }).del()
  revalidatePath('/qr')
}

export async function addMeasureOpt(prjId, option) {
  prjId = Number(prjId)

  const project = await db('Project').where({ id: prjId }).select('measureOpt').first()
  const measureOpt = [...(project.measureOpt || []), option]
  const res = await db('Project').where({ id: prjId }).update({ measureOpt })

  revalidatePath('/qr')
  return res
}

export async function deleteMeasureOpt({ optVal, prjId }) {
  prjId = Number(prjId)

  await db('Project')
    .where({ id: prjId })
    .update({
      missOpt: db.raw('array_remove("measureOpt", ?)', [optVal]),
    })

  revalidatePath('/qr')
}
