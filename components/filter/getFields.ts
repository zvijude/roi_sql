'use server'

import { db } from '@/db/db'
import { getUsers } from '@/lib/user/db/get'

export async function getFields(prjId: number) {
  let fields = {
    qrs: [] as number[],
    floors: [] as number[],
    aptNums: [] as number[],
    parts: [] as string[],
    users: [] as any,
  }

  const qrs = await db.qr.findMany({
    where: { prjId },
    select: { qrNum: true, floor: true, aptNum: true, part: true },
    orderBy: { qrNum: 'asc' },
  })

  const users = (await getUsers({ prjId })) as any
  fields.users = users ? users.map((user) => user.name) : []

  const qrsSet = new Set<number>()
  const floorsSet = new Set<number>()
  const aptNumsSet = new Set<number>()
  const partsSet = new Set<string>()

  qrs.forEach((qr) => {
    qrsSet.add(qr.qrNum)
    floorsSet.add(qr.floor)
    aptNumsSet.add(qr.aptNum)
    partsSet.add(qr.part.name)
  })

  fields.qrs = Array.from(qrsSet)
  fields.floors = Array.from(floorsSet)
  fields.aptNums = Array.from(aptNumsSet)
  fields.parts = Array.from(partsSet)

  fields.floors = Array.from(new Set(fields.floors)).sort((a, b) => a - b)
  fields.aptNums = Array.from(new Set(fields.aptNums)).sort((a, b) => a - b)

  return fields
}
