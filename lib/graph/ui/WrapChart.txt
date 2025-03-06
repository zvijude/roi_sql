'use client'
import { ResponsiveContainer } from 'recharts'
import Title from 'zvijude/general/Title'

export default function WrapChart({ children, title }) {
  return (
    <div className='h-96 border bg-white p-4 rounded-lg'>
      <Title lbl={title} />
      <ResponsiveContainer width='100%' height='100%'>
        {children}
      </ResponsiveContainer>
    </div>
  )
}
