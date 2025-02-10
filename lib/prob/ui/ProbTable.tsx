'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'
import EventChip from '@/lib/events/ui/EventChip'
import { probDic } from '@/db/types'
import { Btn } from 'zvijude/btns'
import SelectEventStatus from '@/lib/events/ui/SelectEventStatus'

export default function ProbTable({ data }) {
  const headers = [
    { key: 'status', label: 'סטטוס', format: 'formatStatus' },
    { key: 'type', label: 'סוג בקשה', format: 'formatType' },
    { key: '_', label: 'עדכון סטטוס', format: 'formatStatusUpdate' },
    { key: 'price', label: 'מחיר', format: 'formatCurrency' },
    { key: 'qrNum', label: 'QR' },
    { key: 'loc', label: 'מיקום' },
    { key: 'part_name', label: 'פרט' },
    { key: 'create_name', label: 'נוצר ע"י' },
    { key: 'createdAt', label: 'נוצר בתאריך', format: 'formatDateTime' },
    { key: 'res_name', label: 'נענה ע"י' },
    { key: 'resAt', label: 'נענה בתאריך', format: 'formatDateTime' },
    { key: 'title', label: 'משימה' },
    { key: 'desc', label: 'תיאור' },
    { key: 'media', label: 'תמונות', format: 'formatMedia' },
    { key: 'id', label: 'מזהה' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatStatus(type) {
    return <EventChip type={type} />
  }
  function formatType(type) {
    return <p className='font-semibold'>{probDic[type]}</p>
  }
  function formatMedia(media, item) {
    if (!media?.[0]) return null
    return (
      <>
        <Btn icon='image' popoverTarget={`popMedia-${item.id}`} clr='icon' />
        <div popover='auto' id={`popMedia-${item.id}`} className='pop size-96'>
          <img src={media[0]} alt='' />
        </div>
      </>
    )
  }
  function formatStatusUpdate(_, item) {
    if (item.status !== 'WAITING') return null
    return (
      <>
        <Btn icon='pen' popoverTarget={`popStatus-${item.id}`} clr='icon' />
        <div popover='auto' id={`popStatus-${item.id}`} className='pop'>
          <SelectEventStatus item={item} />
        </div>
      </>
    )
  }

  const config = {
    columns,
    setColumns,
    data,
    noCheckboxs: true,
    funcs: { formatStatus, formatType, formatMedia, formatStatusUpdate },
    state,
    setState,
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
