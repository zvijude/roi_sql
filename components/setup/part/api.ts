'use server'

import { Part } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db } from '@/sql'

export async function insertPart(data: Part) {
  const res = (await db('Part').insert(data)) as { rowCount: number }

  revalidatePath(`/project`)
  return res.rowCount
}

//!
export async function updatePart({ id, data }: { id: number; data: Part }) {
  const res = await db('Part').where({ id }).update(data)
  revalidatePath(`/project`)
  return res
}

//!
export async function updatePartsTasksId(partIds: number[], tasksId: number) {
  const res = await db('Part').whereIn('id', partIds).update({ tasksId })
  revalidatePath(`/project`)
  return res
}

export async function deletePart(id) {
  const res = await db('Part').where({ id }).del()

  revalidatePath(`/project`)
  return res
}

export async function insertManyParts(data: any[]) {
  const res = (await db('Part').insert(data)) as { rowCount: number }

  revalidatePath(`/project`)
  return res.rowCount
}
