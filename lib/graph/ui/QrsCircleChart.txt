'use client'
import { PieChart, Pie, Cell } from 'recharts'
import WrapChart from './WrapChart'

export default function QrsCircleChart({ data, total }) {
  const {
    IN_PROGRESS: inProgress = [],
    FINISH: finish = [],
    WAITING_TASK: waitingTask = [],
    ON_PROB: onProb = [],
    ON_BGT_REQ: onBgtReq = [],
  } = data

  const chartData = [
    { name: 'בתהליך', value: (inProgress.length / total) * 100, color: '#32CD32' },
    { name: 'ממתינים לאישור', value: (waitingTask.length / total) * 100, color: '#FFA500' },
    { name: 'הושלמו', value: (finish.length / total) * 100, color: '#1E90FF' },
    { name: 'בעיות פתוחות', value: (onProb.length / total) * 100, color: '#FF0000' },
    { name: 'בקשות חריגים', value: (onBgtReq.length / total) * 100, color: '#FF4500' },
  ]

  return (
    <WrapChart title='סטטוס הברקודים'>
      <div className='flex justify-around p-5'>
        {chartData.map((entry, index) => (
          <div key={index} className='text-center'>
            <PieChart width={100} height={100}>
              <Pie
                data={[{ value: entry.value }, { value: 100 - entry.value }]}
                innerRadius={30}
                outerRadius={40}
                startAngle={90}
                endAngle={-270}
                dataKey='value'>
                <Cell key={`cell-0`} fill={entry.color} />
                <Cell key={`cell-1`} fill='#E8E8E8' />
              </Pie>
            </PieChart>
            <p className='mt-2 text-lg font-bold'>{entry.value.toFixed(2)}%</p>
            <p className='text-sm text-gray-500'>{entry.name}</p>
          </div>
        ))}
      </div>
    </WrapChart>
  )
}
