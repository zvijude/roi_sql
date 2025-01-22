'use server'

import { Part } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'
import { onErr } from '@/db/errors'

export async function insertPart(data: Part) {
  const res = await db.part
    .create({
      data: {
        ...data,
        name: data.name.trim(),
      },
    })
    .catch(onErr)

  revalidatePath(`/project`)

  return res
}

export async function updatePart({ id, data }: { id: number; data: Part }) {
  const res = await db.part.update({
    where: { id },
    data,
  })

  revalidatePath(`/project`)
  return res
}

export async function updatePartsTasksId(partIds: number[], tasksId: number) {
  const res = await db.part.updateMany({
    where: {
      id: { in: partIds },
    },
    data: {
      tasksId,
    },
  })

  revalidatePath(`/project`)
  return res
}

export async function deletePart(id) {
  const res = await db.part.delete({
    where: { id },
  })

  revalidatePath(`/project`)
  return res
}
