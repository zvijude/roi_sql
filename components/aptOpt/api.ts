'use server'

import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addAptOpt(prjId, option) {
  prjId = Number(prjId)

  const project = await db('Project').where({ id: prjId }).first()
  const updatedAptOpt = [...(project.aptOpt || []), option]
  const res = await db('Project').where({ id: prjId }).update({ aptOpt: updatedAptOpt })

  revalidatePath('/qr')
  return res
}

export async function deleteAptOpt({ optVal, path, prjId }) {
  prjId = Number(prjId)

  await db('Project')
    .where({ id: prjId })
    .update({
      aptOpt: db.raw('array_remove("aptOpt", ?)', [optVal]),
    })

  revalidatePath(path)
}
