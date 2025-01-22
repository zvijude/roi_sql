'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import { Btn } from 'zvijude/btns'
import Table, { ConfigT } from 'zvijude/table'
import Filter from './filter/index'
import ActiveFilter from '@/components/filter/activeFilter'
import TableChip from '@/ui/TableChip'
import TableTopbar from 'zvijude/table/TableTopbar'
import { grantedDic, mainHeader } from '@/db/types'
import { popWindow } from '@/ui/popWindow'
import { BgtReqStatus } from '@prisma/client'

export default function BgtReqTable({ data, query, fields }) {
  const headers = [
    { key: 'status', label: 'סטטוס', format: 'statusColor' },
    { key: 'desc', label: 'תיאור הבקשה' },
    { key: 'amount', label: 'סכום החריגה', format: 'formatCurrency' },
    ...mainHeader,
    { key: 'updatedAt', label: 'עודכן בתאריך', format: 'formatDateTime' },
  ]

  function statusColor(val) {
    return (
      <TableChip
        lbl={grantedDic[val]}
        type={
          val === BgtReqStatus.GRANTED
            ? 'success'
            : val === BgtReqStatus.DENIED
            ? 'error'
            : val === BgtReqStatus.WAITING
            ? 'warning'
            : 'info'
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
    lsId: 'BgtReqTable',
    funcs: { statusColor },
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
          popoverTarget='filterBgtReqPop'
          className='bg-white'
        />
        <ActiveFilter filter={query} />
      </TableTopbar>
      <Table config={config} tblCls='rounded-t-none' />

      <Filter query={query} fields={fields} />
    </>
  )
}

type BgtReq = {
  id: string
  granted: string
  resBy: { name: string }
  [key: string]: any
}
