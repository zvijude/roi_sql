import { db } from '@/db/db'
// import { getCurUserQuery } from '@/lib/user/db/get'
import { groupBy } from '@/utils/func'

export async function getPeriodic(prjId: number, query = {}) {
  prjId = Number(prjId)
  const res = await db.qr.findMany({
    where: { prjId, ...query },
    select: {
      id: true,
      qrNum: true,
      floor: true,
      aptNum: true,
      status: true,
      totalTasksCount: true,
      totalTasksCompleted: true,
    },
    orderBy: { qrNum: 'asc' },
  })

  const floors = groupBy(res, ({ floor }) => floor)
  const floorsByApts = {}
  Object.keys(floors).forEach((floor) => {
    floorsByApts[floor] = groupBy(floors[floor], ({ aptNum }) => aptNum)
  })
  // 'floorsByApts' Example:
  // {
  //   '1': { '1': [ [Object], [Object] ], '2': [ [Object] ] },
  //   '2': { '1': [ [Object] ] },
  //   '22': { '4': [ [Object] ], '10': [ [Object] ] }
  // }

  return floorsByApts
}

export async function getPeriodicChartData(prjId: number) {
  const qrs = await db.qr.findMany({
    where: { prjId },
    select: { status: true, updatedAt: true },
  })
  return groupBy(qrs, ({ status }) => status)
}

export async function getQrPeriodicPop(prjId: number, qrNum: number) {
  prjId = Number(prjId)
  qrNum = Number(qrNum)

  const query = {
    where: { qr: { qrNum } },
    include: {
      qr: { select: { loc: true, qrNum: true, part: { select: { name: true, desc: true } } } },
      createdBy: true,
      task: { select: { title: true, desc: true, media: true, note: true } },
    },
  }

  const qrEvents = (await db.project.findUnique({
    where: { id: prjId },
    select: {
      completedTasks: query,
      waitingTasks: query,
      skippedTasks: query,
      probs: query,
      bgtReqs: query,
    },
  })) as any

  const qrSetupData = await db.qr.findUnique({
    where: { qrNum_prjId: { qrNum, prjId } },
    select: {
      totalTasksCount: true,
      totalTasksCompleted: true,
      loc: true,
      part: { select: { name: true, desc: true } },
      createdBy: { select: { name: true } },
      createdAt: true,
      status: true,
    },
  })

  return {
    qrEvents: [
      ...qrEvents.completedTasks,
      ...qrEvents.waitingTasks,
      ...qrEvents.skippedTasks,
      ...qrEvents.probs,
      ...qrEvents.bgtReqs,
    ].sort((a, b) => a.qr.date - b.qr.date),
    qrSetupData,
  }
}
