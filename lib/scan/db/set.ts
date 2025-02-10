'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'

export async function addScan({ prjId, qrNum }) {
  prjId = Number(prjId)
  qrNum = Number(qrNum)

  const user = await getUser()
  const kablanId = user?.kablanId
  await db('Scan').insert({
    prjId,
    qrNum,
    userId: user!.id,
    kablanId,
  })
}
