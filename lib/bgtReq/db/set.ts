// 'use server'

// import { db } from '@/sql'
// import { revalidatePath } from 'next/cache'
// import { getUser } from '@/auth/authFuncs'
// import { ProbStatus, ProbType, QrStatus } from '@prisma/client'
// import { updateQrStatus } from '@/lib/qr/db/set'

// // create bgtReq
// export async function addBgtReq(taskId, qrId, data, prjId) {
//   const user = await getUser()

//   const bgtReq = await db('Prob').insert({
//     type: ProbType.BGT_REQ,
//     desc: data.desc,
//     media: data.media,
//     kablanId: user?.kablanId,
//     taskId: taskId,
//     createdById: user?.id,
//     prjId: prjId,
//     price: data.price,
//   })

//   await updateQrStatus(qrId, QrStatus.ON_BGT_REQ)
//   revalidatePath('/qr')

//   return bgtReq
// }

// // // update bgtReq
// // export async function updateProbStatus(id: number, status: ProbStatus) {
// //   const user = await getUser()

// //   const res = await db('Prob')
// //     .where('id', id)
// //     .update({
// //       status,
// //       resAt: new Date(),
// //       resById: user?.id,
// //     })
// //     .returning('taskId')

// //   const qr = await db('Task').where('id', res[0].taskId).select('qrId').first()

// //   await updateQrStatus(qr.qrId, QrStatus.IN_PROGRESS)
// //   revalidatePath('/project/setup/problems')

// //   return res
// // }

// // 'use server'

// // import { revalidatePath } from 'next/cache'
// // import { db } from '@/db/db'
// // import { getUser } from '@/auth/authFuncs'
// // import { BgtReqStatus, QrStatus } from '@prisma/client'
// // import { updateQrStatus } from '@/lib/qr/db/set'

// // export async function updateBgtReqStatus(id: number, status: BgtReqStatus) {
// //   const user = await getUser()
// //   if (!user) return 'Operation is invalid without a USER'

// //   const res = await db.bgtReq.update({
// //     where: { id },
// //     data: {
// //       status,
// //       resBy: { connect: { id: user.id } },
// //       resAt: new Date(),
// //     },
// //   })

// //   await updateQrStatus(res.qrId, QrStatus.IN_PROGRESS)
// //   revalidatePath('/project/setup/requests')

// //   return res
// // }

// // export async function addBgtReq(taskId, qrId, data, prjId) {
// //   prjId = Number(prjId)
// //   const user = await getUser()
// //   const res = await db.bgtReq.create({
// //     data: {
// //       desc: data.desc,
// //       media: data.media,
// //       amount: Number(data.amount),
// //       kablanId: Number(user?.kablanId),
// //       qr: { connect: { id: qrId } },
// //       task: { connect: { id: taskId } },
// //       createdBy: { connect: { id: user!.id } },
// //       prj: { connect: { id: prjId } },
// //     },
// //   })

// //   await updateQrStatus(res.qrId, QrStatus.ON_BGT_REQ)

// //   revalidatePath('/qr')

// //   return res
// // }
