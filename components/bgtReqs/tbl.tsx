'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'
import { probDic } from '@/db/types'
import { Btn } from 'zvijude/btns'

// for format status
import { isManager } from '@/db/types'
import { updateProbStatus } from '@/components/events/api'
import { useUser } from '@/utils/userCtx'
import { SelectObj } from 'zvijude/form'
import { toast } from 'zvijude/pop'
import EventChip from '../global/EventChip'
import BtnMedia from '@/ui/BtnMedia'

export default function BgtReqTable({ data }) {
  const headers = [
    { key: 'status', label: 'סטטוס', format: 'formatStatus' },
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
    return <BtnMedia media={media} item={item} />
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

function SelectEventStatus({ item }) {
  const { user } = useUser() as any
  const isMng = isManager(user.role)
  function onBgt(e) {
    if (!confirm('האם אתה בטוח שברצונך לעדכן סטטוס?')) return
    toast('loading', `מעדכן סטטוס`)
    updateProbStatus(item.id, e.target.value)
    toast('success', `סטטוס עודכן בהצלחה`)
  }

  function onProb() {
    if (!confirm('האם אתה בטוח שברצונך לסמן את הבעיה כפתורה?')) return
    toast('loading')
    updateProbStatus(item.id, 'SOLVED')
    toast('success', `בעיה עודכנה בהצלחה`)
  }
  return (
    <div>
      {item.status === 'WAITING' && isMng && (
        <div>
          {item.type === 'PROB' && <Btn lbl='פתור בעיה' onClick={onProb} />}
          {item.type === 'BGT_REQ' && (
            <SelectObj
              placeholder='עדכן סטטוס'
              options={[
                { label: 'אישור', value: 'GRANTED' },
                { label: 'דחה', value: 'DENIED' },
              ]}
              onChange={onBgt}
            />
          )}
        </div>
      )}
    </div>
  )
}
