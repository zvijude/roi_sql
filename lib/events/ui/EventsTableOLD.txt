'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import EventChip from '@/lib/events/ui/EventChip'
import TableTopbar from 'zvijude/table/TableTopbar'
import { mainHeader } from '@/db/types'
import { popWindow } from '@/ui/popWindow'

export default function EventsTable({ data }) {
  const headers = [
    { key: 'type', label: 'סוג האירוע', format: 'formatType' },
    { key: 'task.price', label: 'מחיר', format: 'formatCurrency' },
    ...mainHeader,
    { key: 'task.desc', label: 'תיאור' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatType(type) {
    return <EventChip type={type} />
  }

  function onRowClick(item) {
    const type = item.type.toLowerCase()
    popWindow(`/pops/${type}/${item.id}`)
  }

  const config = {
    columns,
    setColumns,
    lsId: 'EventsTable123',
    data,
    noCheckboxs: true,
    funcs: { formatType },
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
