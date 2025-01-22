'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'
import { getUser } from '@/auth/authFuncs'
import { BgtReqStatus, QrStatus } from '@prisma/client'
import { updateQrStatus } from '@/lib/qr/db/set'

export async function updateBgtReqStatus(id: number, status: BgtReqStatus) {
  const user = await getUser()
  if (!user) return 'Operation is invalid without a USER'

  const res = await db.bgtReq.update({
    where: { id },
    data: {
      status,
      resBy: { connect: { id: user.id } },
      resAt: new Date(),
    },
  })

  await updateQrStatus(res.qrId, QrStatus.IN_PROGRESS)
  revalidatePath('/project/setup/requests')

  return res
}

export async function addBgtReq(taskId, qrId, data, prjId) {
  prjId = Number(prjId)
  const user = await getUser()
  const res = await db.bgtReq.create({
    data: {
      desc: data.desc,
      media: data.media,
      amount: Number(data.amount),
      kablanId: Number(user?.kablanId),
      qr: { connect: { id: qrId } },
      task: { connect: { id: taskId } },
      createdBy: { connect: { id: user!.id } },
      prj: { connect: { id: prjId } },
    },
  })

  await updateQrStatus(res.qrId, QrStatus.ON_BGT_REQ)

  revalidatePath('/qr')

  return res
}
