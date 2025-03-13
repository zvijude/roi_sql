import { getUser } from '@/auth/authFuncs'
import { isManager } from '@/db/types'
import { redirect } from 'next/navigation'

export default async function SetupLayout({ children }) {
  const user = await getUser()
  if (!isManager(user.role)) return redirect('/')

  return <div>{children}</div>
}
