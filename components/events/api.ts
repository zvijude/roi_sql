'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/sql'
import { getUser } from '@/auth/authFuncs'
import { ProbStatus, QrStatus } from '@/db/types'
import { updateQrStatus } from '@/components/qr/api'

// create prob
export async function addProb(data) {
  const { type, taskId, qrId, prjId, desc, media, price = 0 } = data
  const user = await getUser()

  await db('Prob').insert({
    type,
    desc,
    media,
    price,
    taskId,
    prjId,
    kablanId: user?.kablanId,
    createdById: user?.id,
  })

  await updateQrStatus(qrId, type === 'BGT_REQ' ? QrStatus.ON_BGT_REQ : QrStatus.ON_PROB)
  revalidatePath('/qr')
}

// update prob
export async function updateProbStatus(id: number, status: ProbStatus) {
  const user = await getUser()

  const res = await db('Prob')
    .where('id', id)
    .update({
      status,
      resAt: new Date(),
      resById: user?.id,
    })
    .returning('taskId')

  const qr = await db('Task').where('id', res[0].taskId).select('qrId').first()

  await updateQrStatus(qr.qrId, QrStatus.IN_PROGRESS)
  revalidatePath('/project')

  return res
}
