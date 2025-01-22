import { grantedDicLbl, roleDicLbl } from '@/db/types'
import { ProbStatus, QrStatus } from '@prisma/client'

export function formToQuery(data: any) {
  const query = { qr: {} } as any

  if (data.solved) query.status = data.solved === 'פתור' ? ProbStatus.SOLVED : ProbStatus.WAITING
  if (data.granted) query.granted = grantedDicLbl[data.granted]
  if (data.role) query.mainTask = { for: roleDicLbl[data.role] }
  if (data.floor) query.qr.floor = Number(data.floor)
  if (data.aptNum) query.qr.aptNum = Number(data.aptNum)
  if (data.user) query.createdBy = { name: data.user }
  if (data.approvedBy) query.skippedBy = { name: data.approvedBy }
  if (data.part) query.qr.part = { name: data.part }
  if (data.qrNum) query.qr.qrNum = Number(data.qrNum)

  if (data.fromDate) query.createdAt = { gte: new Date(data.fromDate) } // created at
  if (data.toDate) {
    query.createdAt = {
      ...query.createdAt,
      lte: new Date(data.toDate),
    }
  }

  if (data.budgetFrom) query.amount = { gte: Number(data.budgetFrom) } // budget amount range
  if (data.budgetTo) {
    query.amount = {
      ...query.amount,
      lte: Number(data.budgetTo),
    }
  }

  if (data.fromDate_com) query.completedAt = { gte: new Date(data.fromDate_com) } // completed at
  if (data.toDate_com) {
    query.completedAt = {
      ...query.completedAt,
      lte: new Date(data.toDate_com),
    }
  }

  if (data.fromDate_s) query.skippedAt = { gte: new Date(data.fromDate_s) } // skipped at
  if (data.toDate_s) {
    query.skippedAt = {
      ...query.skippedAt,
      lte: new Date(data.toDate_s),
    }
  }

  return query
}

export function formToQueryPeriodic(data: any) {
  const query = {} as any

  if (data.part) query.part = { name: JSON.parse(data.part).name }
  if (data.taskStageId) {
    query.curTask = { mainTask: { id: Number(data.taskStageId) } }
    query.status = { not: QrStatus.FINISH }
  }

  if (data.floor) query.floor = Number(data.floor)
  if (data.qrNum) query.qrNum = Number(data.qrNum)
  if (data.role) query.mainTask = { for: roleDicLbl[data.role] }
  if (data.aptNum) query.aptNum = Number(data.aptNum)
  if (data.front) query.front = data.front
  if (data.user) query.createdBy = { name: data.user }

  return query
}
