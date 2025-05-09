'use server'

import { db } from '@/sql'
import { getUser } from '@/auth/authFuncs'
import { connectQrToNextTask, updateQrStatus } from '@/components/qr/api'
import { QrStatus, TaskStatus } from '@/db/types'
import { revalidatePath } from 'next/cache'

export async function setTaskCompletion(curTask: any, data) {
  const user = await getUser()
  if (!user) return

  const needApproval = curTask.needApproval
  needApproval ? await updateQrStatus(curTask.qrId, QrStatus.WAITING_TASK) : await connectQrToNextTask(curTask)

  const res = await db('Task')
    .where({ id: curTask.id })
    .update({
      status: needApproval ? TaskStatus.WAITING : TaskStatus.COMPLETED,
      note: data.note,
      media: data.media,
      kablanId: user?.kablanId,
      createdById: user.id,
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

export async function addMedia(taskId: number, media: string) {
  const res = await db('Task')
    .where({ id: taskId })
    .update({ media: [media] })

  revalidatePath('/qr')

  return res
}

export async function updateSkippedTask({ data, curTask }) {
  const user = (await getUser()) as any

  const res = await db('Task').where({ id: curTask.id }).update({
    status: TaskStatus.SKIPPED,
    createdById: user.id,
    resAt: new Date(),
    note: data.note,
    media: data.media,
  })

  await connectQrToNextTask(curTask)

  revalidatePath('/qr')

  return res
}
