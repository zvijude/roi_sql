'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function addGlassPallet({ prj_id, data }) {
  prj_id = Number(prj_id)
  const user = await getUser()
  await db('glass_pallet').insert({ prj_id, created_by_id: user.id, ...data })
  revalidatePath('/glass')
}

export async function addGlass({ data }) {
  await db('glass').insert({ ...data })
  revalidatePath('/glass')
}
