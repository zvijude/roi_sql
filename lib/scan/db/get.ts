// import { getUser } from '@/auth/authFuncs'
// import { db } from '@/db/db'
// import { groupBy } from '@/utils/func'

// export async function getUserScans(prjId, userId) {
//   prjId = Number(prjId)
//   userId = Number(userId)

//   return await db.scan.findMany({
//     where: { prjId, userId },
//   })
// }

// export async function getKablanScans(prjId, kablanId) {
//   prjId = Number(prjId)
//   kablanId = Number(kablanId)

//   return await db.scan.findMany({
//     where: { prjId, kablanId },
//   })
// }

// export async function getMyScans(prjId) {
//   prjId = Number(prjId)

//   const user = await getUser()
//   return await db.scan.findMany({
//     where: { prjId, userId: user!.id },
//   })
// }

// export async function getPrjScansByFloor(prjId) {
//   prjId = Number(prjId)

//   const res = await db.scan.findMany({
//     where: { prjId },
//     select: { qr: { select: { floor: true } } },
//   })

//   const qrs = res.map((scan) => scan.qr)
//   const floors = groupBy(qrs, ({ floor }) => `קומה ${floor}`) as Record<string, number[]>
//   return Object.entries(floors).map(([floor, scans]) => ({ floor, scans: scans.length }))
// }
