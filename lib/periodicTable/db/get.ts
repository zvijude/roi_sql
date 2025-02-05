import { db } from '@/sql'
import { groupBy } from '@/utils/func'

export async function getPeriodic(prjId: number, query = {}) {
  prjId = Number(prjId)
  const res = await db('Qr').where({ prjId })
  
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
  const qrs = await db('Qr').where({ prjId }).select('status', 'updatedAt')
  return groupBy(qrs, ({ status }) => status)
}
