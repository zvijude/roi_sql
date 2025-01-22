import { getUser, userInPrj } from '@/auth/authFuncs'
import Topbar from '@/components/layout/Topbar'
import MainNav from '@/components/layout/MainNav'
import { getProjectName } from '@/db/project/get'
import GlobalLayout from '@/ui/GlobalLayout'
import GoogleTranslate from '@/ui/GoogleTranslate'
import ScanQrCamera from '@/utils/ScanQrCamera'

export default async function RootLayout({ children, params }) {
  const user = await getUser()
  const { prjId } = await params
  await userInPrj({ prjId })
  const prjName = await getProjectName(prjId)

  return (
    <GlobalLayout>
      <Topbar user={user} prjId={prjId} />
      <div className="grid grid-cols-[50px_1fr] mobile:grid-cols-1">
        <MainNav prjId={prjId} prjName={prjName} />
        <div className="grid m-8 mobile:mx-2 mobile:my-0 overflow-x-hidden">{children}</div>
        <div className="desktop:hidden">
          <GoogleTranslate />
          <ScanQrCamera />
        </div>
      </div>
    </GlobalLayout>
  )
}
