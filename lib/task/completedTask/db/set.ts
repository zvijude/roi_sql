// 'use server'

// import { getUser } from '@/auth/authFuncs'
// import { db } from '@/db/db'
// import { connectQrToNextTask, updateQrStatus } from '@/lib/qr/db/set'
// import { QrStatus, TaskStatus } from '@prisma/client'
// import { revalidatePath } from 'next/cache'

// // set task as completed or waiting
// export async function setTaskCompletion(curTask: any, note: string) {
//   const user = await getUser()
//   if (!user) return

//   const prjId = Number(curTask.prjId)
//   const needApproval = curTask.needApproval

//   needApproval
//     ? await updateQrStatus(curTask.qrId, QrStatus.WAITING_TASK)
//     : await connectQrToNextTask(curTask)

//   // create waiting or completed task
//   const createTblObj = {
//     create: {
//       createdBy: { connect: { id: user.id } },
//       prj: { connect: { id: prjId } },
//       qr: { connect: { id: curTask.qrId } },
//       kablanId: user.kablanId,
//     },
//   }
//   const createTbl = needApproval ? { waiting: createTblObj } : { completed: createTblObj }

//   const res = await db.task
//     .update({
//       where: { id: curTask.id },
//       data: {
//         note,
//         kablanId: user.kablanId,
//         status: needApproval ? TaskStatus.WAITING : TaskStatus.COMPLETED,
//         ...createTbl,
//         qr: { update: { curTask: needApproval ? { connect: { id: curTask.id } } : undefined } },
//       },
//     })
//     .catch((err) => {
//       return { failed: true, err: err.message + 'בעיה ביצירת המשימה' }
//     })

//   revalidatePath('/qr')

//   return res
// }

// export async function addCompletedTask(curTask, createdById, kablanId) {
//   const user = (await getUser()) as any
//   await db.completedTask.create({
//     data: {
//       task: { connect: { id: curTask.id } },
//       createdBy: { connect: { id: createdById } },
//       prj: { connect: { id: curTask.prjId } },
//       kablanId,
//       qr: { connect: { id: curTask.qrId } },
//       resBy: { connect: { id: user.id } },
//       resAt: new Date(),
//     },
//   })
// }

// export async function addMedia(taskId: number, media: string[]) {
//   const res = await db.task
//     .update({
//       where: { id: taskId },
//       data: { media: { push: media } },
//     })
//     .catch((err) => ({ failed: true, err: err.message + 'בעיה בהוספת המדיה' }))

//   revalidatePath('/qr')

//   return res
// }
