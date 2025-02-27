'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'

export default function MissTable({ data }) {
  const headers = [
    { key: 'isActive', label: 'טופל ?', format: 'formatActive' },
    { key: 'item', label: 'פריט' },
    { key: 'qntt', label: 'כמות' },
    { key: 'qrNum', label: 'QR' },
    { key: 'loc', label: 'מיקום' },
    { key: 'part_name', label: 'פרט' },
    { key: 'create_name', label: 'נוצר ע"י' },
    { key: 'createdAt', label: 'נוצר בתאריך', format: 'formatDateTime' },
    { key: 'resAt', label: 'נענה בתאריך', format: 'formatDateTime' },
    { key: 'resBy', label: 'נענה ע"י' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatActive(isActive) {
    return <p className='font-bold'>{isActive ? '❌' : '✅'}</p>
  }

  const config = {
    columns,
    setColumns,
    data,
    funcs: { formatActive },
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
