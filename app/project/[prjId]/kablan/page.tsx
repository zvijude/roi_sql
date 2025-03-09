import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { getAllKablan } from '@/components/kablan/db'
import AllKablansTable from '@/components/kablan/ui/AllKablanTable'
import { redirect } from 'next/navigation'

export default async function Kablans({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)
  const user = await getUser()
  if (!isManager(user!.role)) redirect(`/project/${prjId}`)

  const kablans = await getAllKablan(prjId)

  return (
    <>
      <AllKablansTable kablans={kablans} key={Math.random()} prjId={prjId} />
    </>
  )
}
