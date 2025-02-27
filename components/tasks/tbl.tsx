'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'
import { Btn } from 'zvijude/btns'
import EventChip from '../global/EventChip'
import BtnMedia from '@/ui/BtnMedia'

export default function TaskTable({ data }) {
  const headers = [
    { key: 'status', label: 'סטטוס', format: 'formatStatus' },
    { key: 'price', label: 'מחיר', format: 'formatCurrency' },
    { key: 'qrNum', label: 'QR' },
    { key: 'loc', label: 'מיקום' },
    { key: 'part_name', label: 'פרט' },
    { key: 'create_name', label: 'נוצר ע"י' },
    { key: 'createdAt', label: 'נוצר בתאריך', format: 'formatDateTime' },
    { key: 'res_name', label: 'אושר ע"י' },
    { key: 'resAt', label: 'אושר בתאריך', format: 'formatDateTime' },
    { key: 'title', label: 'משימה' },
    { key: 'desc', label: 'תיאור המשימה' },
    { key: 'media', label: 'תמונות', format: 'formatMedia' },
    { key: 'id', label: 'מזהה' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatStatus(status) {
    return <EventChip type={status} />
  }
  function formatMedia(media, item) {
    if (!media?.[0]) return null
    return <BtnMedia media={media} item={item} />
  }

  const config = {
    columns,
    setColumns,
    data,
    noCheckboxs: true,
    funcs: { formatStatus, formatMedia },
    state,
    setState,
  } as ConfigT

  // bg-green-900 text-green-50
  // bg-slate-700 text-white

  return (
    <>
      <TableTopbar className=''>
        <Search config={config} />
      </TableTopbar>
      <Table config={config} tblCls='rounded-t-none' />
    </>
  )
}

// <h2 className='text-2xl rounded-md font-semibold self-start leading-none mx-1'>משימות</h2>
