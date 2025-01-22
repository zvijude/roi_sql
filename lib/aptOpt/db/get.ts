'use server'

import { db } from '@/db/db'
import { revalidatePath } from 'next/cache'

export async function getAllAptOpt(data: { prjId: number; path?: string }) {
  const res = await db.aptOpt.findMany({
    where: { projectId: data.prjId },
  })

  revalidatePath('/qr')
  return res
}
