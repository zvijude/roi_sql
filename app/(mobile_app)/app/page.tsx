import { getUser } from '@/auth/authFuncs'
import Boxbtn from '@/components/Boxbtn'
import { getUserProjects } from '@/db/project/get'
import { appOnlyUsers, gradTxt } from '@/db/types'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Btn } from 'zvijude/btns'

export default async function Page() {
  const user = await getUser()
  if (!user) return null
  const userProjects = await getUserProjects()
  const role = user.role

  if (userProjects.length === 1 && appOnlyUsers.includes(role))
    return redirect(`/app/project/${userProjects[0].id}`)

  return (
    <div>
      <header className='m-5'>
        <h1 className='text-2xl font-bold text-center mb-8'>
          ברוכים הבאים ל <span className={gradTxt}>RoiCrm</span>
        </h1>
        <p className='text-center font-bold text-lg'>בחר פרויקט:</p>
      </header>
      <main className='flex m-6 justify-center'>
        {userProjects.map((prj) => (
          <Boxbtn txt={prj.name} icon='city' href={`/app/project/${prj.id}`} />
        ))}
      </main>
      {!appOnlyUsers.includes(role) && (
        <div className='flex justify-self-center'>
          <Link href='/'>
            <Btn lbl='עבור למערכת CRM' />
          </Link>
        </div>
      )}
    </div>
  )
}
