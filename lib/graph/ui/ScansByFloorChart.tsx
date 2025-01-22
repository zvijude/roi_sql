'use client'

import { blue } from 'tailwindcss/colors'
import BarsChart, { BarsProps } from 'zvijude/charts/BarsChart'
import WrapChart from './WrapChart'

export default function ScansByFloorChart({ data }) {
  const configBars = {
    data,
    subject: 'floor',
    values: [{ label: 'סריקות', val: 'scans', clr: blue[800] }],
    smallLabel: true,
    sortBy: 'floor',
  } as BarsProps

  return (
    <WrapChart title='סריקות שבוצעו לכל קומה'>
      <BarsChart config={configBars} />
    </WrapChart>
  )
}
