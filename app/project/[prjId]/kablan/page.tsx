import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { getKablansNames } from '@/lib/kablan/db/get'
import AllKablansTable from '@/lib/kablan/ui/AllKablanTable'
import SelectKablan from '@/lib/kablan/ui/SelectKablan'
import { db } from '@/sql'
import { redirect } from 'next/navigation'

export default async function Kablans({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  const user = await getUser()
  if (!isManager(user!.role)) redirect(`/project/${prjId}`)

  const kablanNames = await getKablansNames(prjId)
  const kablans = await db('_all_kablans').where({ prjId })

  return (
    <>
      <SelectKablan kablans={kablanNames} key={Math.random()} prjId={prjId} />
      <AllKablansTable kablans={kablans} key={Math.random()} prjId={prjId} />
    </>
  )
}
