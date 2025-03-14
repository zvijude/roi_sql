'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addMedida({ qrId = null, data, prjId }) {
  const user = await getUser()
  const insertData = { prjId, createdById: user.id, ...data }
  if (qrId) insertData.qrId = Number(qrId)

  await db('medidot').insert(insertData)
  qrId ? revalidatePath('/qr') : revalidatePath('/project')
}

export async function deleteMedida({ id }) {
  await db('medidot').where({ id }).del()
  revalidatePath('/qr')
}

export async function completeMedida({ id }) {
  const user = await getUser()
  await db('medidot').where({ id }).update({ isActive: false, updatedById: user.id, resAt: new Date() })

  revalidatePath('/qr')
}

export async function addMedidotOpt(prjId, option) {
  prjId = Number(prjId)

  const project = await db('Project').where({ id: prjId }).select('medidot_opt').first()
  const medidot_opt = [...(project.medidot_opt || []), option]
  const res = await db('Project').where({ id: prjId }).update({ medidot_opt })

  revalidatePath('/qr')
  return res
}

export async function deleteMedidaOpt({ optVal, prjId }) {
  prjId = Number(prjId)

  await db('Project')
    .where({ id: prjId })
    .update({
      medidot_opt: db.raw('array_remove("medidot_opt", ?)', [optVal]),
    })

  revalidatePath('/qr')
}
