'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db/db'
import { getUser } from '@/auth/authFuncs'
import { ProbStatus, QrStatus } from '@prisma/client'
import { updateQrStatus } from '@/lib/qr/db/set'

// create
export async function addProb(taskId, qrId, data, prjId) {
  const user = await getUser()

  const problem = await db.prob.create({
    data: {
      desc: data.desc,
      media: data.media,
      status: ProbStatus.WAITING,
      kablanId: Number(user?.kablanId) || null,
      qr: { connect: { id: qrId } },
      task: { connect: { id: taskId } },
      createdBy: { connect: { id: Number(user?.id) } },
      prj: { connect: { id: Number(prjId) } },
    },
  })

  await updateQrStatus(qrId, QrStatus.ON_PROB)

  revalidatePath('/qr')

  return problem
}

// update - solved
export async function solvedProb(id) {
  const user = await getUser()

  const res = await db.prob.update({
    where: { id },
    data: {
      status: ProbStatus.SOLVED,
      resAt: new Date(),
      resById: Number(user?.id),
    },
  })
  // .catch((e) => {
  //   return { failed: true, msg: `Failed to update problem ${id}: ${e.message}` }
  // })

  await updateQrStatus(res.qrId, QrStatus.IN_PROGRESS)

  revalidatePath('/project/setup/problems')

  return res
}

// update - cancel
export async function cancelProb(id) {
  const user = await getUser()

  const res = await db.prob.update({
    where: { id },
    data: { status: ProbStatus.CANCELED },
  })
  // .catch((e) => {
  //   return { failed: true, msg: `Failed to update problem ${id}: ${e.message}` }
  // })

  await updateQrStatus(res.qrId, QrStatus.IN_PROGRESS)

  revalidatePath('/project/setup/problems')

  return res
}
