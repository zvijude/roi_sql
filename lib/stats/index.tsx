'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from 'zvijude/funcs'

const COLORS = ['#FE6F42', '#46DB9C', '#2042F5', '#7092E7', '#6B4BEC']

type Props = {
  data: Record<any, any>[]
  sum?: any
  title: string
}

export default function StatsEvents({ data, sum, title }: Props) {
  return (
    <div className='flex items-start gap-4 m-0.5'>
      <main className={`bg-white py-4 px-5 mobile:py-3 rounded-md shadow-1`}>
        <section className='flex justify-between items-start'>
          <p className='font-bold text-lg'>{title}</p>
          {sum ? (
            <div>
              <p className=''>{sum.name}</p>
              <p className='text-2xl mobile:text-xl'>{formatCurrency(sum.value)}</p>
            </div>
          ) : (
            <div className='h-16' />
          )}
        </section>

        <section className='flex mt-4 gap-9'>
          <TaskPieChart data={data} />
          <div className='grid gap-2 mt-1'>
            {data.map((el, i) => {
              return (
                <section className='flex gap-4'>
                  <div className='size-3 rounded-full' style={{ background: COLORS[i] }} />
                  <span className='flex'>
                    <p className=' leading-none'>{el.name}</p>
                    <p className='font-semibold'>{el.value}</p>
                  </span>
                </section>
              )
            })}
          </div>
        </section>
      </main>
    </div>
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
