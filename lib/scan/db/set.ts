'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/db/db'

export async function addScan({ prjId, qrNum }) {
  prjId = Number(prjId)
  qrNum = Number(qrNum)

  const user = await getUser()
  const kablanId = user?.kablanId
  return await db.scan
    .create({
      data: {
        prjId,
        qrNum,
        userId: user!.id,
        kablanId,
      },
    })
    .catch((e) => {
      console.log('QR not exist \naddScan error: ', e)
    })
}
