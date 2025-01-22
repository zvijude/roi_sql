'use client'
import { useRouter } from 'next/navigation'
import StatsUi from '@/ui/StatsUi'
import { getTodayDataRange } from '@/utils/func'
import { BgtReqStatus } from '@prisma/client'
import { formatDate } from 'zvijude/dates/funcs'

export default function Stats({ data }) {
  const router = useRouter()
  const stats = calcStats(data)
  function onClick(query) {
    if (query.resAt) query.resAt = getTodayDataRange()
    if (query.createdAt) query.createdAt = getTodayDataRange()

    const url = new URLSearchParams({ query: JSON.stringify(query) })
    router.replace('?' + url, { scroll: false })
  }

  return (
    <div className='flex mb-8'>
      <StatsUi
        lbl='בקשות שאושרו'
        stat={stats.grantedReq}
        onClick={() => onClick({ status: BgtReqStatus.GRANTED })}
        className='border-green-700'
      />
      <StatsUi
        lbl='בקשות שנדחו'
        stat={stats.deniedReq}
        onClick={() => onClick({ status: BgtReqStatus.DENIED })}
        className='border-red-700'
      />
      <StatsUi
        lbl='בקשות בהמתנה'
        stat={stats.waitingReq}
        onClick={() => onClick({ status: BgtReqStatus.WAITING })}
      />

      <StatsUi
        lbl='בקשות שאושרו היום'
        stat={stats.grantedToday}
        onClick={() => onClick({ status: BgtReqStatus.GRANTED, resAt: true })}
      />
      <StatsUi
        lbl='בקשות שנדחו היום'
        stat={stats.deniedToday}
        onClick={() => onClick({ status: BgtReqStatus.DENIED, resAt: true })}
      />
      <StatsUi
        lbl='בקשות שנוצרו היום'
        stat={stats.createdToday}
        onClick={() => onClick({ createdAt: true })}
      />
    </div>
  )
}

function calcStats(data) {
  const today = formatDate(new Date())
  return {
    grantedReq: data.filter((req) => req.status === BgtReqStatus.GRANTED).length,
    deniedReq: data.filter((req) => req.status === BgtReqStatus.DENIED).length,
    waitingReq: data.filter((req) => req.status === BgtReqStatus.WAITING).length,
    createdToday: data.filter((req) => formatDate(req.createdAt) === today).length,
    grantedToday: data.filter(
      (req) => req.status === BgtReqStatus.GRANTED && formatDate(req.resAt) === today
    ).length,
    deniedToday: data.filter(
      (req) => req.status === BgtReqStatus.DENIED && formatDate(req.resAt) === today
    ).length,
  }
}
