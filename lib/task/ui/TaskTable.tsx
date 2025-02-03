'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'
import { popWindow } from '@/ui/popWindow'
import EventChip from '@/lib/events/ui/EventChip'

export default function TaskTable({ data }) {
  const headers = [
    { key: 'status', label: 'סטטוס', format: 'formatStatus' },
    { key: 'price', label: 'מחיר', format: 'formatCurrency' },
    { key: 'createdAt', label: 'תאריך', format: 'formatDateTime' },
    { key: 'qrNum', label: 'QR' },
    { key: 'loc', label: 'מיקום' },
    { key: 'part_name', label: 'פרט' },
    { key: 'create_name', label: 'נוצר ע"י' },
    { key: 'res_name', label: 'אושר ע"י' },
    { key: 'title', label: 'משימה' },
    { key: 'desc', label: 'תיאור המשימה' },
    { key: 'id', label: 'מזהה' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatStatus(status) {
    return <EventChip type={status} />
  }

  function onRowClick(item) {
    const type = item.status.toLowerCase()
    popWindow(`/pops/${type}/${item.id}`)
  }

  const config = {
    columns,
    setColumns,
    data,
    noCheckboxs: true,
    funcs: { formatStatus },
    state,
    setState,
    onRowClick,
  } as ConfigT

  return (
    <>
      <TableTopbar>
        <Search config={config} />
      </TableTopbar>
      <Table config={config} tblCls='rounded-t-none' />
    </>
  )
}
