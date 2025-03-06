import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { getKablansNames } from '@/components/kablan/db'
import AllKablansTable from '@/components/kablan/ui/AllKablanTable'
import SelectKablan from '@/components/kablan/ui/SelectKablan'
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
