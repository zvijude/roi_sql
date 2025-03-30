'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addGlassPallet({ prjId, data }) {
  prjId = Number(prjId)
  const user = await getUser()
  await db('glass_pallet').insert({ prjId, createdById: user.id, ...data })
  revalidatePath('/project/[prjId]/glass')
}

export async function addGlass({ data }) {
  await db('glass').insert({ ...data })
  revalidatePath('/project/[prjId]/glass')
}

export async function createGlassInfo({ data }) {
  if (data.id) await db('glass_info').where('id', data.id).update(data)
  else await db('glass_info').insert(data)
  revalidatePath('/project/[prjId]/glass')
}

export async function deleteGlassInfo(id) {
  await db('glass_info').where('id', id).del()
  revalidatePath('/project/[prjId]/glass')
}
