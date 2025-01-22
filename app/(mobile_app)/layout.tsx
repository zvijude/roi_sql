import GoogleTranslate from '@/ui/GoogleTranslate'
import GlobalLayout from '@/ui/GlobalLayout'
import { gradTxt, roleDic } from '@/db/types'
import { getUser } from '@/auth/authFuncs'
import Icon from 'zvijude/icon'
import ScanQrCamera from '@/utils/ScanQrCamera'

export default async function RootLayout({ children }) {
  const user = await getUser()
  if (!user) return null

  return (
    <GlobalLayout>
      <div className='items-center justify-center'>
        <GoogleTranslate />
        <div>
          <div
            className='
              sticky top-0 right-0 px-3 py-1 z-10
              border-b border-slate-200
              bg-slate-100
              shadow-md
              text-sm font-semibold
              flex justify-between'>
            <div className='flex gap-1'>
              <Icon name='user' className='size-3' />
              {user.name} ({roleDic[user.role]})
            </div>
            <div className={`${gradTxt} text-[22px]`}>
              <a href='/app'>RoiCRM</a>
            </div>
          </div>
          <div className='w-5/6 mx-auto'>{children}</div>
        </div>
        <ScanQrCamera />
      </div>
    </GlobalLayout>
  )
}

