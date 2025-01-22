import { UserCookieType } from '@/auth/authFuncs'
import { gradTxt, roleDic } from '@/db/types'
import Link from 'next/link'
import Topbar from 'zvijude/nav/Topbar'

export default function TopbarUi({ user, prjId }: { user: UserCookieType | null; prjId: string }) {
  if (!user) return null

  return (
    <Topbar>
      <div className='flex'>
        <img src={user.picture} alt='user image' className='size-7 rounded-full' />
        <span className='font-semibold text-sm'>
          {user.name} ({roleDic[user.role]})
        </span>
      </div>
      <Link href={`/project/${prjId}`} className={gradTxt}>
        ROICrm
      </Link>
    </Topbar>
  )
}
