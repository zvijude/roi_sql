'use server'

import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addAptOpt(prjId, option) {
  prjId = Number(prjId)

  // const res = await db.aptOpt.create({
  //   data: {
  //     project: { connect: { id: prjId } },
  //     option,
  //   },
  // })

  const res = await db('Project').where({ id: prjId }).update({ aptOpt: option })

  revalidatePath('/qr')
  return res
}

export async function updateAptOpt(data: { optId: number; opt: string; path?: string }) {
  const res = await db.aptOpt.update({
    where: { id: data.optId },
    data: {
      option: data.opt,
    },
  })

  revalidatePath('/qr')
  return res
}

export async function deleteAptOpt(data: { optId: number; path?: string }) {
  const res = await db.aptOpt.delete({
    where: { id: data.optId },
  })

  revalidatePath('/qr')
  return res
}
