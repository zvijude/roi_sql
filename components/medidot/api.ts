'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addMedida({ qrId, item, data }) {
  qrId = Number(qrId)
  const user = await getUser()
  await db('medidot').insert({ qrId, item, createdById: user.id, ...data })
  revalidatePath('/qr')
}

export async function deleteMedida({ id }) {
  await db('medidot').where({ id }).del()
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
