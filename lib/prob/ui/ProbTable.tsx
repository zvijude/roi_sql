'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import { Btn } from 'zvijude/btns'
import Filter from './filter'
import ActiveFilter from '@/components/filter/activeFilter'
import TableChip from '@/ui/TableChip'
import TableTopbar from 'zvijude/table/TableTopbar'
import { mainHeader, probStatusDic } from '@/db/types'
import { ProbStatus } from '@prisma/client'
import { popWindow } from '@/ui/popWindow'

export default function ProbTable({ data, query, fields }) {
  if (!data) return null
  const headers = [{ key: 'status', label: 'סטטוס', format: 'statusColor' }, ...mainHeader]

  function statusColor(val) {
    return (
      <TableChip
        lbl={probStatusDic[val]}
        type={
          val === ProbStatus.WAITING
            ? 'warning'
            : val === ProbStatus.SOLVED
            ? 'success'
            : 'canceled'
        }
      />
    )
  }

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function onRowClick(item) {
    const type = item.type.toLowerCase()
    popWindow(`/pops/${type}/${item.id}`)
  }

  const config = {
    columns,
    setColumns,
    lsId: 'ProbTable123',
    funcs: { statusColor: statusColor },
    data,
    state,
    noCheckboxs: true,
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
          popoverTarget='filterProbPop'
          className='bg-white'
        />
        <ActiveFilter filter={query} />
      </TableTopbar>
      <Table config={config} tblCls='rounded-none' />
      <Filter query={query} fields={fields} />
    </>
  )
}
