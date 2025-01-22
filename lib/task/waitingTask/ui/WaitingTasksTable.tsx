'use client'

import { useState } from 'react'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import Search from 'zvijude/table/Search'
import Filter from './Filter'
import ActiveFilter from '@/components/filter/activeFilter'
import TableTopbar from 'zvijude/table/TableTopbar'
import { mainHeader } from '@/db/types'
import { popWindow } from '@/ui/popWindow'

export default function WaitingTasksTable({ tasks, query, fields }) {
  if (!tasks) return null
  const headers = [...mainHeader, { key: 'task.price', label: 'מחיר', format: 'formatCurrency' }]

  const [state, setState] = useState(tasks)
  const [columns, setColumns] = useState(headers)

  function onRowClick(item) {
    const type = item.type.toLowerCase()
    popWindow(`/pops/${type}/${item.id}`)
  }

  const config = {
    columns,
    setColumns,
    lsId: 'waitingTasksTable123',
    data: tasks,
    state,
    setState,
    onRowClick,
    noCheckboxs: true,
  } as ConfigT

  return (
    <>
      <TableTopbar>
        <Search config={config} />
        <Btn
          lbl='סינון'
          clr='text'
          icon='filter'
          popoverTarget='filterWaitingTasks'
          className='bg-white'
        />
        <ActiveFilter filter={query} />
      </TableTopbar>
      <Table config={config} tblCls='rounded-t-none' />
      <Filter query={query} fields={fields} />
    </>
  )
}
