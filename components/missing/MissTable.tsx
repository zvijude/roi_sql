'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { deleteMiss, missCompleted } from './api'
import BtnMedia from '@/ui/BtnMedia'

export default function MissTable({ data }) {
  const headers = [
    { key: 'isActive', label: 'טופל ?', format: 'formatActive' },
    { key: '_', label: 'שינוי סטטוס', format: 'formatStatusUpdate' },
    { key: 'item', label: 'פריט' },
    { key: 'qntt', label: 'כמות' },
    { key: 'qrNum', label: 'QR' },
    { key: 'loc', label: 'מיקום' },
    { key: 'part_name', label: 'פרט' },
    { key: 'create_name', label: 'נוצר ע"י' },
    { key: 'createdAt', label: 'נוצר בתאריך', format: 'formatDateTime' },
    { key: 'resAt', label: 'נענה בתאריך', format: 'formatDateTime' },
    { key: 'res_by', label: 'נענה ע"י' },
    { key: 'note', label: 'הערה' },
    { key: 'media', label: 'תמונות', format: 'formatMedia' },

  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatActive(isActive) {
    return <p className='font-bold'>{isActive ? '❌' : '✅'}</p>
  }

  function formatMedia(media, item) {
    if (!media?.[0]) return null
    return <BtnMedia media={media} item={item} />
  }
  function formatStatusUpdate(_, item) {
    return (
      <>
        <Btn icon='pen' className='size-6' popoverTarget={`popStatus-${item.id}`} clr='icon' />
        <div popover='auto' id={`popStatus-${item.id}`} className='pop'>
          <div className='flex justify-between'>
            <Btn icon='trash' clr='icon' onClick={() => onDelete(item.id)} />
            {item.isActive && <Btn lbl='סמן כטופל' clr='text' onClick={() => onStatusChange(item.id)} />}
          </div>
        </div>
      </>
    )
  }

  async function onDelete(id) {
    if (!confirm('האם אתה בטוח שברצונך למחוק את המידות?')) return
    toast('loading')
    await deleteMiss({ id })
    toast('success', 'המידות נמחקו בהצלחה')
  }

  async function onStatusChange(id) {
    if (!confirm('האם אתה בטוח שברצונך לסמן את המידות כטופלות?')) return
    toast('loading')
    await missCompleted({ id })
    toast('success', 'המידות סומנו כטופלות ב  הצלחה')
  }

  const config = {
    columns,
    setColumns,
    data,
    funcs: { formatActive, formatStatusUpdate, formatMedia },
    noCheckboxs: true,
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
