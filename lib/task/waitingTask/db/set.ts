'use server'

import { db } from '@/db/db'
import { connectQrToNextTask, updateQrStatus } from '@/lib/qr/db/set'
import { QrStatus, TaskStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { addCompletedTask } from '@/lib/task/completedTask/db/set'

export async function approveTask({ curTask }) {
  await db.task.update({
    where: { id: curTask.id },
    data: { status: TaskStatus.COMPLETED },
  })
  await updateQrStatus(curTask.qrId, QrStatus.IN_PROGRESS)
  
  const { createdById, kablanId } = (await deleteWaitingTask(curTask.id)) as any
  await addCompletedTask(curTask, createdById, kablanId)
  await connectQrToNextTask(curTask)

  revalidatePath('/qr')
}

async function deleteWaitingTask(taskId) {
  const tmp = await db.waitingTask.findFirst({
    where: { taskId },
    select: { createdById: true, kablanId: true },
  })
  await db.waitingTask.deleteMany({ where: { taskId } })

  return tmp
}
