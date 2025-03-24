'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '@/sql'

export async function getUserProjects() {
  const user = await getUser()
  if (!user) return []

  const res = await db('_prj_user')
    .join('Project', { '_prj_user.prjId': 'Project.id' })
    .select('Project.id', 'Project.name')
    .where({ userId: user?.id })
  return res
}

export async function getProjectName(prjId) {
  prjId = Number(prjId)
  const res = await db('Project').where({ id: prjId }).select('name').first()
  return res.name
}
