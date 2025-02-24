import { eventDic, roleDic } from '@/db/types'
import { formatDate } from 'zvijude/dates/funcs'

export const filterConfig = [
  {
    key: 'skippedBy',
    title: 'אושר ע"י',
    formatter: (value) => value?.name,
  },
  {
    key: 'createdBy',
    title: 'נוצר ע"י',
    formatter: (value) => value?.name,
  },
  {
    key: 'completedBy',
    title: 'בוצע ע"י',
    formatter: (value) => value?.name,
  },
  {
    key: 'reqBy',
    title: 'נוצר ע"י',
    formatter: (value) => value?.name,
  },
  {
    key: 'status',
    title: 'סטטוס',
    formatter: (value) => (value ? 'פתור' : 'לא פתור'),
  },
  {
    key: 'granted',
    title: 'סטטוס',
    formatter: (value) => eventDic[value],
  },
  {
    key: 'qr.qrNum',
    title: 'QR מספר',
    formatter: (value) => value,
  },
  {
    key: 'qr.floor',
    title: 'קומה',
    formatter: (value) => value,
  },
  {
    key: 'qr.aptNum',
    title: 'מספר דירה',
    formatter: (value) => value,
  },
  {
    key: 'qr.part.name',
    title: 'פרט',
    formatter: (value) => value,
  },
  {
    key: 'amount',
    title: 'סכום',
    formatter: (value) => {
      if (value?.gte && value?.lte) return `${value.gte} - ${value.lte}`
      if (value?.gte) return `מ- ${value.gte}`
      if (value?.lte) return `עד ${value.lte}`
    },
  },
  {
    key: 'solvedAt',
    title: 'תאריך פתרון',
    formatter: (value) => {
      if (value?.gte && value?.lte) return `${formatDate(value.gte)} - ${formatDate(value.lte)}`
      if (value?.gte) return `מ- ${formatDate(value.gte)}`
      if (value?.lte) return `עד ${formatDate(value.lte)}`
    },
  },
  {
    key: 'createdAt',
    title: 'תאריך',
    formatter: (value) => {
      if (value?.gte && value?.lte) return `${formatDate(value.gte)} - ${formatDate(value.lte)}`
      if (value?.gte) return `מ- ${formatDate(value.gte)}`
      if (value?.lte) return `עד ${formatDate(value.lte)}`
    },
  },
  {
    key: 'skippedAt',
    title: 'תאריך דילוג על משימה',
    formatter: (value) => {
      if (value?.gte && value?.lte) return `${formatDate(value.gte)} - ${formatDate(value.lte)}`
      if (value?.gte) return `מ- ${formatDate(value.gte)}`
      if (value?.lte) return `עד ${formatDate(value.lte)}`
    },
  },
  {
    key: 'resAt',
    title: 'תאריך עדכון',
    formatter: (value) => {
      if (value?.gte && value?.lte) return `${formatDate(value.gte)} - ${formatDate(value.lte)}`
      if (value?.gte) return `מ- ${formatDate(value.gte)}`
      if (value?.lte) return `עד ${formatDate(value.lte)}`
    },
  },

  {
    key: 'completedAt',
    title: 'תאריך השלמת המשימה',
    formatter: (value) => {
      if (value?.gte && value?.lte) return `${formatDate(value.gte)} - ${formatDate(value.lte)}`
      if (value?.gte) return `מ- ${formatDate(value.gte)}`
      if (value?.lte) return `עד ${formatDate(value.lte)}`
    },
  },
  {
    key: 'mainTask.for',
    title: 'תפקיד',
    formatter: (value) => roleDic[value],
  },
]
