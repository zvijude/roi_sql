'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from 'zvijude/funcs'

// const COLORS = ['#46DB9C', '#FE6F42', '#2042F5', '#7092E7', '#6B4BEC']

const COLORS = [
  '#20D1C2', // Teal
  '#F98B71', // Soft coral
  '#78B5FF', // Light blue
  '#1E4DB4', // Deep blue
  '#0E1B3D', // Dark navy
]

// const COLORS = [
//   '#ff8800', // Saturated orange
//   '#00c176', // Vibrant green
//   '#1d4ed8', // Base blue
//   '#b620e0', // Bold purple
//   '#ff3b3b', // Intense red
// ]

type Props = {
  data: Record<any, any>[]
  sum?: any
  title: string
}

export default function StatsEvents({ data, sum, title }: Props) {
  return (
    <main className={`bg-white py-4 px-5 mobile:py-3 rounded-md shadow-1`}>
      <section className='flex justify-between items-start'>
        <p className='font-bold text-xl'>{title}</p>
        {sum ? (
          <div>
            <p className=''>{sum.name}</p>
            <p className='text-2xl mobile:text-xl'>{formatCurrency(sum.value)}</p>
          </div>
        ) : (
          <div className='h-[61px]' />
        )}
      </section>

      <section className='flex mt-4 gap-9 flex-nowrap'>
        <TaskPieChart data={data} />
        <div className='grid gap-1 mt-1'>
          {data.map((el, i) => {
            return (
              <section className='flex gap-4 flex-nowrap'>
                <div className='size-3 rounded-full' style={{ background: COLORS[i] }} />
                <div className='flex gap-x-4 gap-y-1 justify-between'>
                  <p className='font-semibold  leading-none'>{el.name}</p>
                  <p className='text-lg'>{el.value}</p>
                  {el.sum ? <p className='text-slate-700'>{formatCurrency(el.sum)}</p> : null}
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function TaskPieChart({ data }) {
  const radius = 60

  return (
    <PieChart width={radius * 2} height={radius * 2}>
      <Pie dataKey='value' data={data} innerRadius={radius - 18} outerRadius={radius} isAnimationActive={false}>
        {data.map((entry, i) => (
          <Cell key={i} fill={COLORS[i]} />
        ))}
      </Pie>
    </PieChart>
  )
}
