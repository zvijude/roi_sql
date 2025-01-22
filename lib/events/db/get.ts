import { db } from '@/db/db'
import { getCurUserQuery } from '@/lib/user/db/get'

export async function getEvents(prjId: number) {
  prjId = Number(prjId)
  const userQuery = await getCurUserQuery()

  const query = {
    include: {
      qr: { select: { loc: true, qrNum: true, part: { select: { name: true } } } },
      createdBy: true,
      task: { select: { title: true, price: true } },
    },
    where: userQuery,
  }

  const res = await db.project.findUnique({
    where: { id: prjId },
    include: {
      probs: query,
      bgtReqs: query,
      completedTasks: query,
      waitingTasks: query,
      skippedTasks: query,
    },
  })
  if (!res) return []

  const events = [
    ...res.completedTasks,
    ...res.probs,
    ...res.bgtReqs,
    ...res.waitingTasks,
    ...res.skippedTasks,
  ].sort((a: any, b: any) => b.date - a.date)
  return events
}

//! in this version - the `bgtReq` is adjusted to look like `task`, but the code is messy...
// export async function getEvents(prjId: number) {
//   prjId = Number(prjId)
//   const userQuery = await getCurUserQuery()

//   const query = {
//     include: {
//       qr: { select: { loc: true, qrNum: true, part: { select: { name: true } } } },
//       createdBy: true,
//       task: { select: { title: true, price: true, desc: true } },
//     },
//     where: userQuery,
//   }

//   const res = (await db.project.findUnique({
//     where: { id: prjId },
//     include: {
//       probs: query,
//       bgtReqs: query,
//       completedTasks: query,
//       waitingTasks: query,
//       skippedTasks: query,
//     },
//   })) as any
//   if (!res) return []

//   // making `bgtReqs` with `price`
//   const events = [
//     ...res.completedTasks,
//     ...res.probs,
//     ...res.bgtReqs,
//     ...res.waitingTasks,
//     ...res.skippedTasks,
//   ]
//     .map((e) => (e.type === EventType.BGT_REQ ? { ...e, task: { price: e.amount } } : e))
//     .sort((a, b) => b.date - a.date)
//   return events
// }
