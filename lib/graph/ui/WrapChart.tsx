'use client'
import { ResponsiveContainer } from 'recharts'
import Title from 'zvijude/general/Title'

export default function WrapChart({ children, title }) {
  return (
    <div className='border bg-white p-4 rounded-lg m-3'>
      <Title lbl={title} />
      <ResponsiveContainer width='100%' height='100%'>
        {children}
      </ResponsiveContainer>
    </div>
  )
}
