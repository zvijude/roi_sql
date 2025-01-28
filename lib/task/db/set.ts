'use server'

import { db } from '@/sql'
import { getUser } from '@/auth/authFuncs'
import { connectQrToNextTask, updateQrStatus } from '@/lib/qr/db/set'
import { QrStatus, TaskStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { create } from 'domain'

export async function setTaskCompletion(curTask: any, note: string) {
  const user = await getUser()
  if (!user) return

  const needApproval = curTask.needApproval
  needApproval ? await updateQrStatus(curTask.qrId, QrStatus.WAITING_TASK) : await connectQrToNextTask(curTask)

  const res = await db('Task')
    .where({ id: curTask.id })
    .update({
      status: needApproval ? TaskStatus.WAITING : TaskStatus.COMPLETED,
      note,
      kablanId: user?.kablanId,
    })

  revalidatePath('/qr')

  return res
}

export async function approveTask({ curTask }) {
  const user = await getUser()
  await db('Task').where({ id: curTask.id }).update({ status: TaskStatus.COMPLETED, resById: user!.id, resAt: new Date() })

  await updateQrStatus(curTask.qrId, QrStatus.IN_PROGRESS)
  await connectQrToNextTask(curTask)

  revalidatePath('/qr')
}

export async function addMedia(taskId: number, media: string[]) {
  const res = await db('Task').where({ id: taskId }).update({ media })

  revalidatePath('/qr')

  return res
}
