import { getUser } from '@/auth/authFuncs'
import Boxbtn from '@/components/Boxbtn'
import NewProject from '@/components/popovers/NewProject'
import { getUserProjects } from '@/db/project/get'
import { Role, roleDic } from '@/db/types'
import { redirect } from 'next/navigation'
import InstallApp from '@/ui/InstallApp'

export default async function my_projects() {
  const userProjects = await getUserProjects()
  const user = await getUser()
  if (!user) return redirect('/auth')

  const role = user.role
  return (
    <>
      <InstallApp />
      <p className='absolute top-0 right-0 m-4'>
        <span className='font-semibold text-xl'>{user.name}</span> ({roleDic[user.role]})
      </p>
      <div className='grid place-items-center'>
        <Boxbtn txt='פרויקט חדש' icon='plus' role='btn' isAdmin={role === Role.ADMIN} popoverTarget='newProjectPop' />
        <main className='flex m-6 justify-center'>
          {userProjects.map((prj) => (
            <Boxbtn txt={prj.name} icon='city' href={`/project/${prj.id}`} key={prj.id} />
          ))}
        </main>
      </div>

      <NewProject />
    </>
  )
}
