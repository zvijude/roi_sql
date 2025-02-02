import { db as pdb } from '@/db/db'
import { db } from '@/sql'
import { BgtReqStatus, EventType, Role, TaskStatus } from '@prisma/client'
import { groupBy } from '@/utils/func'

export async function getAllKablansData(prjId: number) {
  const res = (await db.project.findUnique({
    where: { id: prjId },
    include: {
      tasks: { where: { kablanId: { not: null } } },
      bgtReqs: { where: { kablanId: { not: null } } },
      probs: { where: { kablanId: { not: null } } },
    },
  })) as any
  const { tasks, bgtReqs, probs } = res

  const tasksByKablan = groupBy(tasks, ({ kablanId }) => kablanId)
  const bgtReqsByKablan = groupBy(bgtReqs, ({ kablanId }) => kablanId)
  const probsByKablan = groupBy(probs, ({ kablanId }) => kablanId)
  const kablanNames = (await getKablansNames(prjId)) as any

  const kablans = kablanNames.map((k) => {
    const tasks = tasksByKablan[k.id] || []
    const totalPrice = calcKablanPrice(tasks, bgtReqsByKablan[k.id])
    const totalWaiting = tasks.filter((t) => t.status === TaskStatus.WAITING).length
    const totalCompleted = tasks.filter((t) => t.status === TaskStatus.COMPLETED).length
    const totalBgtReqs = bgtReqsByKablan[k.id]?.length || 0
    const totalProbs = probsByKablan[k.id]?.length || 0

    return {
      ...k,
      totalPrice,
      totalCompleted,
      totalWaiting,
      totalBgtReqs,
      totalProbs,
    }
  })

  return kablans
}

// Including both completed tasks and granted bgtReqs
function calcKablanPrice(tasks, bgtReqs) {
  const tasksPrice = tasks.reduce(
    (sum, t) => (t.status === TaskStatus.COMPLETED ? sum + t.price : sum),
    0
  )
  const bgtReqsPrice = bgtReqs.reduce(
    (sum, b) => (b.status === BgtReqStatus.GRANTED ? sum + b.amount : sum),
    0
  )
  return tasksPrice + bgtReqsPrice
}

export async function isKablanExistsInPrj(prjId, kablanId): Promise<boolean> {
  prjId = Number(prjId)
  kablanId = Number(kablanId)
  const res = await db.project.findFirst({
    where: { id: prjId, users: { some: { id: kablanId, role: Role.KABLAN } } },
  })
  return res ? true : false
}

export async function getKablansNames(prjId: number) {
  prjId = Number(prjId)
  // return await db.user.findMany({
  //   where: {
  //     projects: { some: { id: prjId } },
  //     role: Role.KABLAN,
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     phone: true,
  //     email: true,
  //     role: true,
  //   },
  //   orderBy: { updatedAt: 'desc' },
  // })
  return await db('User').where({ role: Role.KABLAN }).select('id', 'name', 'phone', 'email')
}

export async function getKablanPrice(prjId, kablanId) {
  prjId = Number(prjId)
  kablanId = Number(kablanId)

  const include = {
    qr: { select: { loc: true, qrNum: true, part: { select: { name: true } } } },
    createdBy: true,
    task: { select: { title: true, price: true, status: true, desc: true } },
  }

  const completedTasks = await db.completedTask.findMany({
    where: { prjId, kablanId },
    include,
    orderBy: { updatedAt: 'desc' },
  })

  const bgtReqs = (await db.bgtReq.findMany({
    where: { prjId, kablanId, status: BgtReqStatus.GRANTED },
    include,
    orderBy: { updatedAt: 'desc' },
  })) as any

  return formatSingleKablanEvents(completedTasks, bgtReqs)
}

function formatSingleKablanEvents(completedTasks, bgtReqs) {
  // making `bgtReqs` look like `completedTasks`
  const formattedBgtReqs = bgtReqs.map((b) => ({
    ...b,
    task: { price: b.amount, desc: b.desc, title: b.task.title },
  }))

  return [...completedTasks, ...formattedBgtReqs].sort((a, b) => b.date - a.date)
}
