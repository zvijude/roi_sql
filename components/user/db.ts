import { db } from '@/sql'
import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'

export async function getUsers({ prjId }) {
  const user = await getUser()
  if (!isManager(user!.role)) return false // Only managers can view users

  const res = await db.raw(`
    SELECT
      u.id, u.name, u."firstName", u."lastName", u.role, u."kablanId", u.email, u.phone
    FROM
      "User" u
    JOIN "_prj_user" pu ON u.id = pu."userId"
    WHERE
      pu."prjId" = ?
  `, [prjId])

  return res.rows
}

// export async function getCurUserQuery() {
//   const user = (await getUser()) as any

//   if (isInstaller(user)) return { createdById: user.id }
//   if (user.role === Role.KABLAN) return { kablanId: user.id }
//   return {}
// }
