'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import Filter from './Filter'
import { mainHeader, roleDic } from '@/db/types'
import ActiveFilter from '@/components/filter/activeFilter'
import TableTopbar from 'zvijude/table/TableTopbar'
import { popWindow } from '@/ui/popWindow'

export default function SkippedTasksTable({ data, query, fields }) {
  const headers = [
    ...mainHeader,
    { key: 'price', label: 'מחיר', format: 'formatCurrency' },
    { key: 'createdBy.name', label: 'אושר ע"י' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatRole(val) {
    return roleDic[val]
  }

  function onRowClick(item) {
    const type = item.type.toLowerCase()
    popWindow(`/pops/${type}/${item.id}`)
  }

  const config = {
    columns,
    setColumns,
    lsId: 'SkippedTaskTable123',
    data,
    funcs: { formatRole },
    noCheckboxs: true,
    state,
    setState,
    onRowClick,
  } as ConfigT

  return (
    <>
      <TableTopbar>
        <Search config={config} />
        <Btn
          lbl='סינון'
          clr='text'
          icon='filter'
          popoverTarget='filterSkippedTasks'
          className='bg-white'
        />
        <ActiveFilter filter={query} />
      </TableTopbar>
      <Table config={config} tblCls='rounded-t-none' />
      <Filter query={query} fields={fields} />
    </>
  )
}
