'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { green, white, red, yellow, blue, orange, pink, gray } from 'tailwindcss/colors'

const DynamicChart = dynamic(() => Promise.resolve(Chart), { ssr: false })

export default function PeriodicCharts({ data }) {
  return (
    <div className='flex items-center justify-center min-h-[220px] mobile:min-h-[150px]'>
      <DynamicChart data={data} />
    </div>
  )
}

function Chart({ data }) {
  const {
    IN_PROGRESS: inProgress = [],
    FINISH: finish = [],
    WAITING_TASK: waitingTask = [],
    ON_PROB: onProb = [],
    ON_BGT_REQ: onBgtReq = [],
  } = data

  const total =
    inProgress.length + finish.length + waitingTask.length + onProb.length + onBgtReq.length

  const chartData = [
    { name: 'בתהליך', value: (inProgress.length / total) * 100, color: white },
    { name: 'ממתינים לאישור', value: (waitingTask.length / total) * 100, color: orange[400] },
    { name: 'הושלמו', value: (finish.length / total) * 100, color: green[400] },
    { name: 'בעיות ביצוע', value: (onProb.length / total) * 100, color: red[500] },
    { name: 'בקשות חריגים', value: (onBgtReq.length / total) * 100, color: yellow[400] },
  ]

  function onClick(e) {
    console.log(e)
  }

  return (
    <>
      {/* Desktop View */}
      <div className='flex gap-8 col-span-5 mobile:hidden justify-center'>
        {chartData.map((entry, index) => (
          <div
            key={index}
            className='text-center px-4 transition-transform transform hover:scale-110 cursor-pointer'
            onClick={onClick}>
            <div className='rounded-full border-4 border-white flex items-center justify-center'>
              <PieChart width={135} height={135}>
                <Pie
                  data={[{ value: entry.value }, { value: 100 - entry.value }]}
                  startAngle={90}
                  endAngle={-270}
                  dataKey='value'
                  stroke='black'
                  strokeWidth={0.3}>
                  <Cell key={`cell-0`} fill={entry.color} />
                  <Cell key={`cell-1`} fill={gray[100]} />
                </Pie>
              </PieChart>
            </div>
            <p className='text-lg font-bold'>{entry.value.toFixed(2)}%</p>
            <p className='text-sm text-gray-500 mb-2'>{entry.name}</p>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className='flex flex-wrap justify-center px-2 desktop:hidden'>
        {chartData.map((entry, index) => (
          <div key={index} className='text-center px-2 cursor-pointer' onClick={onClick}>
            <div className='rounded-full border-4 border-white flex items-center justify-center'>
              <PieChart width={75} height={75}>
                <Pie
                  data={[{ value: entry.value }, { value: 100 - entry.value }]}
                  startAngle={90}
                  endAngle={-270}
                  dataKey='value'
                  stroke='black'
                  strokeWidth={0.3}>
                  <Cell key={`cell-0`} fill={entry.color} />
                  <Cell key={`cell-1`} fill='#E8E8E8' />
                </Pie>
              </PieChart>
            </div>
            <p className='text-sm font-bold'>{entry.value.toFixed(2)}%</p>
            <p className='text-xs text-gray-500 mb-2'>{entry.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
