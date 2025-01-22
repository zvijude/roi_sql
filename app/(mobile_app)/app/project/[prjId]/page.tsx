import { getUser, userInPrj } from '@/auth/authFuncs'
import { getProjectName } from '@/db/project/get'
import { gradTxt } from '@/db/types'
import { getInstallerActivity, getKablanActivity, getPrj_mngrActivity } from '@/lib/appUser/db/get'
import Events from '@/lib/appUser/ui/Events'
import { Role } from '@prisma/client'

export default async function Page({ params: { prjId } }) {
  const user = await getUser()
  if (!user) return null
  // await userInPrj({ prjId, redirectUrl: `/app` })

  const prjName = await getProjectName(prjId)
  const installerData = await getInstallerActivity({ prjId, userId: user.id })
  const kablanData = await getKablanActivity({ prjId, kablanId: user.id })
  const prjMngrData = await getPrj_mngrActivity({ prjId })

  const curRole = {
    [Role.INSTALLER]: <Events data={installerData} />,
    [Role.KABLAN]: <Events data={kablanData} />,
    [Role.PRJ_MNGR]: <Events data={prjMngrData} />,
    [Role.ADMIN]: <Events data={prjMngrData} />,
    [Role.SITE_MNGR]: <Events data={prjMngrData} />,
  }

  return (
    <div>
      <header className='m-5'>
        <h1 className='text-2xl font-bold text-center mb-1'>
          ברוכים הבאים ל <span className={gradTxt}>RoiCrm</span>
        </h1>
        <h2 className='text-xl font-semibold text-center'>
          פרוייקט <span className='font-bold text-xl'>{prjName}</span>
        </h2>
      </header>
      <div>{curRole[user.role]}</div>
    </div>
  )
}
