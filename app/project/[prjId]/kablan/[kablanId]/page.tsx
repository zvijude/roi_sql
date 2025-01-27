import { getKablanPrice, getKablansNames, isKablanExistsInPrj } from '@/lib/kablan/db/get'
import SelectKablan from '@/lib/kablan/ui/SelectKablan'
import EventsTable from '@/lib/events/ui/EventsTable'
import { getUser } from '@/auth/authFuncs'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import { isInstaller, isManager } from '@/db/types'
import Stats from '@/lib/kablan/ui/Stats'

export default async function Kablan({ params }) {
  let { prjId, kablanId } = await params
  prjId = Number(prjId)
  kablanId = Number(kablanId)

  const user = await getUser()
  if (!user) return redirect('/auth')

  if (user.role === Role.KABLAN && user.id !== kablanId)
    redirect(`/project/${prjId}/kablan/${user.id}`)
  if (isInstaller(user.role)) redirect(`/project/${prjId}`)

  const isKablanExists = await isKablanExistsInPrj(prjId, kablanId)
  if (!isKablanExists) return redirect(`/project/${prjId}`)

  const curKablan = await getKablanPrice(prjId, kablanId)
  const kablanNames = await getKablansNames(prjId)

  return (
    <>
      <Stats data={curKablan} />
      {isManager(user.role) && (
        <SelectKablan kablans={kablanNames} key={Math.random()} prjId={prjId} />
      )}
      <EventsTable data={curKablan} key={Math.random()} />
    </>
  )
}
