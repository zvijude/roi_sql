import { db } from '@/db/db'

// installer
export async function getInstallerActivity({ prjId, userId }) {
  prjId = Number(prjId)
  userId = Number(userId)

  return await db.project.findUnique({
    where: { id: prjId },
    include: {
      completedTasks: { where: { createdById: userId }, include: { qr: true } },
      waitingTasks: { where: { createdById: userId }, include: { qr: true } },
      skippedTasks: { where: { createdById: userId }, include: { qr: true } },

      probs: { where: { createdById: userId }, include: { qr: true } },
      bgtReqs: { where: { createdById: userId }, include: { qr: true } },
    },
  })


  // return formatActivity(res)
}

// kablan
export async function getKablanActivity({ prjId, kablanId }) {
  prjId = Number(prjId)
  kablanId = Number(kablanId)

  return await db.project.findUnique({
    where: { id: prjId },
    include: {
      completedTasks: { where: { kablanId }, include: { qr: true } },
      waitingTasks: { where: { kablanId }, include: { qr: true } },
      skippedTasks: { where: { kablanId }, include: { qr: true } },

      probs: { where: { kablanId }, include: { qr: true } },
      bgtReqs: { where: { kablanId }, include: { qr: true } },
    },
  })
}

// prj_mngr
export async function getPrj_mngrActivity({ prjId }) {
  prjId = Number(prjId)

  return await db.project.findUnique({
    where: { id: prjId },
    include: {
      completedTasks: { where: { prjId }, include: { qr: true } },
      waitingTasks: { where: { prjId }, include: { qr: true } },
      skippedTasks: { where: { prjId }, include: { qr: true } },

      probs: { where: { prjId }, include: { qr: true } },
      bgtReqs: { where: { prjId }, include: { qr: true } },
    },
  })

}
