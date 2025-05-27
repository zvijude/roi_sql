'use client'

import { useState } from 'react'
import Table, { ConfigT } from 'zvijude/table'
import { useRouter } from 'next/navigation'
import BarsChart, { BarsProps } from 'zvijude/charts/BarsChart'
import { formatCurrency } from 'zvijude/funcs'
import TableTopbar from 'zvijude/table/TableTopbar'
import Search from 'zvijude/table/Search'
import { blue } from 'tailwindcss/colors'
import ExportTable from 'zvijude/table/export'

export default function AllKablansTable({ kablans, prjId }) {
  const headers = [
    { key: 'kablan_name', label: 'שם הקבלן' },
    { key: 'total_price', label: 'סה"כ לתשלום', format: 'formatCurrency' },
    { key: 'price_tasks', label: 'מחיר משימות', format: 'formatCurrency' },
    { key: 'price_bgt_reqs', label: 'מחיר בקשות תקציב', format: 'formatCurrency' },
    { key: 'total_completed_tasks', label: 'משימות שהושלמו' },
    { key: 'total_granted_bgt_reqs', label: 'בקשות תקציב שאושרו' },
  ]

  const [state, setState] = useState(kablans)
  const [columns, setColumns] = useState(headers)
  const router = useRouter()

  function onRowClick(kablan) {
    router.push(`/project/${prjId}/kablan/${kablan.kablan_id}`)
  }

  const config = {
    columns,
    setColumns,
    data: kablans,
    state,
    setState,
    onRowClick,
    noCheckboxs: true,
  } as ConfigT

  return (
    <div>
      <TableTopbar className='justify-between'>
        <Search config={config} />
        <div className='flex gap-2'>
          <ExportTable data={kablans} columns={headers} />
        </div>
      </TableTopbar>

      <Table config={config} tblCls='rounded-t-none' />
    </div>
  )
}
