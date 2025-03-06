'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import WrapChart from './WrapChart'
import { blue } from 'tailwindcss/colors'

export default function TaskCompletionLine({ data }) {
  const chartData = aggregateDataByDate(data)

  return (
    <WrapChart title='משימות שהושלמו לפי תאריך'>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Area type='monotone' dataKey='tasks' stroke={blue[800]} fill={blue[800]} fillOpacity={0.1} />
      </AreaChart>
    </WrapChart>
  )
}

function aggregateDataByDate(data) {
  const dateCounts = {}

  data.forEach((item) => {
    const date = new Date(item.createdAt).toISOString().split('T')[0]
    if (!dateCounts[date]) {
      dateCounts[date] = 0
    }
    dateCounts[date] += 1
  })

  return Object.keys(dateCounts).map((date) => ({
    date,
    tasks: dateCounts[date],
  }))
}
