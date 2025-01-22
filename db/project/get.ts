'use server'

import { getUser } from '@/auth/authFuncs'
import { db } from '../db'

export async function getUserProjects() {
  const user = await getUser()

  // console.log('user#', user)

  const projects = await db.project.findMany({
    where: { users: { some: { id: user?.id } } },
    select: { users: { select: { id: true, name: true } }, id: true, name: true },
  })

  console.log('projects#', projects)

  return projects
}

export async function getProjectName(prjId) {
  prjId = Number(prjId)
  const res = await db.project.findUnique({
    where: { id: Number(prjId) },
    select: { name: true, printQntt: true },
  })

  return res?.name
}

export async function getPrjPrintQntt(prjId) {
  prjId = Number(prjId)
  const res = await db.project.findUnique({
    where: { id: Number(prjId) },
    select: { printQntt: true },
  })

  return res?.printQntt
}
