'use client'

import BarsChart, { BarsProps } from 'zvijude/charts/BarsChart'
import WrapChart from './WrapChart'
import { blue } from 'tailwindcss/colors'

export default function TasksByFloorChart({ data }) {
  const configBars = {
    data,
    subject: 'floor',
    values: [{ label: 'משימות שהושלמו', val: 'completedTasks', clr: blue[800] }],
    smallLabel: true,
    sortBy: 'floor',
  } as BarsProps

  return (
    <WrapChart title='משימות שהושלמו לכל קומה'>
      <BarsChart config={configBars} />
    </WrapChart>
  )
}
