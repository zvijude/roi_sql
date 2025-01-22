'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/db/db'
import { connectQrToNextTask } from '@/lib/qr/db/set'
import { TaskStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function addSkippedTask(curTask: any) {
  const user = await getUser() as any
  const res = await db.task
    .update({
      where: { id: curTask.id },
      data: {
        status: TaskStatus.SKIPPED,
        skipped: {
          create: {
            createdBy: { connect: { id: user.id } },
            prj: { connect: { id: curTask.prjId } },
            qr: { connect: { id: curTask.qrId } },
            kablanId: user.kablanId,
          },
        },
      },
    })
    .catch((err) => {
      return { failed: true, err: err.message + 'בעיה בדילוג על המשימה' }
    })

  await connectQrToNextTask(curTask)

  revalidatePath('/qr')

  return res
}
