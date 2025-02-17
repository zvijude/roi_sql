'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'

export default function MeasureTable({ data }) {
  const headers = [
    { key: 'qrNum', label: 'QR' },
    { key: 'loc', label: 'מיקום' },
    { key: 'part_name', label: 'פרט' },
    { key: 'width', label: 'רוחב', format: 'formatMeasure' },
    { key: 'height', label: 'אורך', format: 'formatMeasure' },
    { key: 'depth', label: 'עומק', format: 'formatMeasure' },
    { key: 'create_name', label: 'נוצר ע"י' },
    { key: 'createdAt', label: 'נוצר בתאריך', format: 'formatDateTime' },
  ]

  const [state, setState] = useState(data)
  const [columns, setColumns] = useState(headers)

  function formatMeasure(value) {
    if(!value) return null
    return <p>{value} מ"מ</p>
  }

  const config = {
    columns,
    setColumns,
    data,
    funcs: { formatMeasure },
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
