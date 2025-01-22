'use client'
import { useRouter } from 'next/navigation'
import StatsUi from '@/ui/StatsUi'
import { getTodayDataRange } from '@/utils/func'
import { ProbStatus } from '@prisma/client'

export default function Stats({ data }) {
  const router = useRouter()
  const stats = calcStats(data)

  function onStat(query) {
    if (query.resAt) query.resAt = getTodayDataRange()
    if (query.createdAt) query.createdAt = getTodayDataRange()

    const url = new URLSearchParams({ query: JSON.stringify(query) })
    router.replace('?' + url, { scroll: false })
  }

  return (
    <div className='flex gap-8 mb-8'>
      <StatsUi
        lbl='בעיות לא פתורות'
        stat={stats.waitingProbs}
        onClick={() => onStat({ status: ProbStatus.WAITING })}
        className='border-red-700'
      />
      <StatsUi
        lbl='בעיות פתורות'
        stat={stats.solvedProbs}
        onClick={() => onStat({ status: ProbStatus.SOLVED })}
        className='border-green-700'
      />
      <StatsUi
        lbl='בעיות שנוצרו היום'
        stat={stats.openToday}
        onClick={() => onStat({ createdAt: true })}
        className='border-red-700'
      />
      <StatsUi
        lbl='בעיות שנפתרו היום'
        stat={stats.solvedToday}
        onClick={() => onStat({ resAt: true, status: ProbStatus.SOLVED })}
        className='border-green-700'
      />
    </div>
  )
}

function calcStats(data) {
  const today = new Date().toISOString().split('T')[0] // 2024-12-23
  return {
    waitingProbs: data.filter((prob) => prob.status === ProbStatus.WAITING).length,
    solvedProbs: data.filter((prob) => prob.status === ProbStatus.SOLVED).length,
    openToday: data.filter((prob) => prob.createdAt.toISOString().split('T')[0] === today).length,
    solvedToday: data.filter(
      (prob) => prob.resAt && prob.resAt.toISOString().split('T')[0] === today
    ).length,
  }
}
