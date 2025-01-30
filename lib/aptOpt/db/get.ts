'use server'

import { db } from '@/sql'
import { revalidatePath } from 'next/cache'

export async function getAllAptOpt(prjId) {
  prjId = Number(prjId)
  console.log('prjId', prjId)

  const res = await db('Project').where({ id: prjId }).select('aptOpt').first()

  // revalidatePath('/qr')
  return res.aptOpt
}
