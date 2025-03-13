import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'

export async function formatFilter({ filter, query }) {
  const date = filter.date
  delete filter.date
  if (date) query.whereRaw(dateFilters[date])

  query.andWhere(filter)

  const user = await getUser()
  if (!isManager(user.role)) {
    user.role === 'KABLAN' ? query.andWhere({ kablanId: user.id }) : query.andWhere({ created_by_id: user.id })
  }

  return query
}

export const dateFilters = {
  'החודש הנוכחי': `EXTRACT(MONTH FROM "createdAt") = EXTRACT(MONTH FROM NOW()) 
                      AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())`,
  'החודש הקודם': `EXTRACT(MONTH FROM "createdAt") = EXTRACT(MONTH FROM NOW() - INTERVAL '1 MONTH') 
                     AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW() - INTERVAL '1 MONTH')`,
  'מתחילת השנה': `"createdAt" >= DATE_TRUNC('year', NOW())`,
  'השבוע הנוכחי': `EXTRACT(WEEK FROM "createdAt") = EXTRACT(WEEK FROM NOW()) 
                      AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())`,
  היום: `"createdAt"::DATE = NOW()::DATE`,
  '3 חודשים אחרונים': `"createdAt" >= NOW() - INTERVAL '3 MONTH'`,
}
