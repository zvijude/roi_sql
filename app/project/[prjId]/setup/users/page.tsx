import { getUsers } from '@/components/user/db'
import { getKablansNames } from '@/components/kablan/db'
import UserForm from '@/components/user/ui/UserForm'
import UsersTable from '@/components/user/ui/UsersTable'

export default async function UsersPage({ params }) {
  let { prjId } = await params
  const users = await getUsers({ prjId })
  const kablans = await getKablansNames(prjId)

  return (
    <>
      <UserForm prjId={prjId} kablans={kablans} />
      <div className='max-w-4xl mt-8'>{users && <UsersTable users={users} kablans={kablans} />}</div>
    </>
  )
}
