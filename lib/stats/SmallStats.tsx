'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from 'zvijude/funcs'

// const COLORS = ['#FE6F42', '#46DB9C', '#2042F5', '#7092E7', '#6B4BEC']

const COLORS = [
  '#D34C3F', // Deep warm red
  '#3A9B78', // Darker teal green
  '#405DD4', // Rich deep blue
  '#C78A2A', // Warm bronze gold
  '#783DC2', // Dark violet
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

export default function SmallStats({ data, sum, title }: Props) {
  return (
    <main className={`bg-white py-4 px-5 mobile:py-3 rounded-md shadow-1`}>
      <section className='flex justify-between items-start'>
        <p className='font-bold text-lg'>{title}</p>
        {sum ? (
          <div>
            <p className=''>{sum.name}</p>
            <p className='text-2xl mobile:text-xl'>{formatCurrency(sum.value)}</p>
          </div>
        ) : (
          <div className='h-[61px' />
        )}
      </section>

      <section className='flex mt-4 gap-9 flex-nowrap'>
        <TaskPieChart data={data} />
        <div className='grid gap-2 mt-1'>
          {data.map((el, i) => {
            return (
              <section className='flex gap-4 flex-nowrap'>
                <div className='size-3 rounded-full' style={{ background: COLORS[i] }} />
                <span className='flex gap-x-4 gap-y-1'>
                  <p className=' leading-none'>{el.name}</p>
                  <p className='font-semibold'>{1357}</p>
                </span>
              </section>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function TaskPieChart({ data }) {
  const radius = 50

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
