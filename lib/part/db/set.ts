'use server'

import { Part } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db as pdb } from '@/db/db'
import { db } from '@/sql'

export async function insertPart(data: Part) {
  const res = (await db('Part').insert({
    ...data,
    name: data.name.trim(),
    updatedAt: new Date(),
  })) as { rowCount: number }

  // const res = await db.part
  //   .create({
  //     data: {
  //       ...data,
  //       name: data.name.trim(),
  //     },
  //   })
  //   .catch(onErr)

  revalidatePath(`/project`)
  return res.rowCount
}

export async function updatePart({ id, data }: { id: number; data: Part }) {
  // const res = await pdb.part.update({
  //   where: { id },
  //   data,
  // })

  const res = await db('Part').where({ id }).update(data)

  revalidatePath(`/project`)
  return res
}

export async function updatePartsTasksId(partIds: number[], tasksId: number) {
  const res = await db('Part').whereIn('id', partIds).update({ tasksId })
  // const res = await pdb.part.updateMany({
  //   where: {
  //     id: { in: partIds },
  //   },
  //   data: {
  //     tasksId,
  //   },
  // })

  revalidatePath(`/project`)
  return res
}

export async function deletePart(id) {
  const res = await db('Part').where({ id }).del()

  // const res = await pdb.part.delete({
  //   where: { id },
  // })

  revalidatePath(`/project`)
  return res
}
