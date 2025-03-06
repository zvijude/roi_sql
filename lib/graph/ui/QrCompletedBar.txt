'use client'

import { blue } from 'tailwindcss/colors'
import BarsChart, { BarsProps } from 'zvijude/charts/BarsChart'
import WrapChart from './WrapChart'

export default function QrsCompletedBar({ data }) {
  const chartData = aggregateCompletedByWeek(data)

  const configBars = {
    data: chartData,
    subject: 'week',
    values: [{ label: 'Completed QRs', val: 'count', clr: blue[800] }],
    smallLabel: true,
    sortBy: 'week',
  } as BarsProps

  return (
    <WrapChart title='ברקודים שהושלמו לפי שבוע'>
      <BarsChart config={configBars} />
    </WrapChart>
  )
}

function aggregateCompletedByWeek(data) {
  const weekCounts = {}

  data.forEach((item) => {
    if (item.status === 'FINISH') {
      const date = new Date(item.updatedAt)
      const year = date.getFullYear()
      const startOfYear = new Date(year, 0, 1)
      const week = Math.ceil(
        ((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24) +
          startOfYear.getDay() +
          1) /
          7
      ) // Calculate ISO week number
      const yearWeek = `${year}-W${String(week).padStart(2, '0')}` // Format as YYYY-WW

      if (!weekCounts[yearWeek]) {
        weekCounts[yearWeek] = 0
      }
      weekCounts[yearWeek] += 1
    }
  })

  return Object.keys(weekCounts).map((week) => ({
    week,
    count: weekCounts[week],
  }))
}
