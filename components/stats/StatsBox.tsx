'use client'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { formatCurrency } from 'zvijude/funcs'
import Link from 'next/link'

// Color scheme
const COLORS = ['#20D1C2', '#F98B71', '#78B5FF', '#1E4DB4', '#0E1B3D']

// URLs for different sections
const EVENT_LINKS = {
  'בקשות חריגים': '/project/1/events/budget_requests',
  משימות: '/project/1/events/tasks',
  'בעיות ביצוע': '/project/1/events/problems',
}

type Props = {
  data: Record<any, any>[]
  sum?: any
  title: string
}

export default function StatsBox({ data, sum, title }: Props) {
  return (
    <Link
      href={EVENT_LINKS[title] || '#'}
      className='bg-white py-4 px-5 rounded-md shadow-1 hover:shadow-4 active:shadow-none transition-shadow cursor-pointer  mobile:w-full'
    >
      <section className='flex justify-between items-start'>
        <p className='font-bold text-xl'>{title}</p>
        {sum ? (
          <div>
            <p className=''>{sum.name}</p>
            <p className='text-2xl'>{formatCurrency(sum.value)}</p>
          </div>
        ) : (
          <div className='h-[61px]' />
        )}
      </section>

      {/* Chart Section */}
      <section className='flex mt-4 gap-9 flex-nowrap'>
        <div className='mobile:hidden'>
          <EventPieChart data={data} />
        </div>
        <div className='grid gap-1 my-1'>
          {data &&
            data.map((el, i) => (
              <div className='flex gap-4 flex-nowrap' key={i}>
                <div className='size-3 rounded-full' style={{ background: COLORS[i] }} />
                <div className='flex gap-x-3 gap-y-1 justify-between'>
                  <p className='font-semibold leading-none'>{el.name}</p>
                  <p className='text-lg'>{el.value}</p>
                  {el.sum ? <p className='text-slate-700'>{formatCurrency(el.sum)}</p> : null}
                </div>
              </div>
            ))}
        </div>
      </section>
    </Link>
  )
}
function EventPieChart({ data }) {
  const radius = 60

  return (
    <ResponsiveContainer width={radius * 2} height={radius * 2} className='cursor-pointer'>
      <PieChart>
        <Pie dataKey='value' data={data} innerRadius={radius - 18} outerRadius={radius} isAnimationActive={false}>
          {data && data.map((entry, i) => <Cell key={i} fill={COLORS[i]} className='cursor-pointer hover:opacity-70' />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
