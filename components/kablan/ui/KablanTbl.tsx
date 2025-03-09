'use client'

import { useState } from 'react'
import Table, { ConfigT } from 'zvijude/table'
import { formatCurrency } from 'zvijude/funcs'
import TableTopbar from 'zvijude/table/TableTopbar'
import Search from 'zvijude/table/Search'

export default function KablanTbl({ kablan }) {
  const headers = [
    { key: 'price', label: 'מחיר', format: 'formatCurrency' },
    { key: 'event_type', label: 'סוג האירוע' },
    { key: 'created_by', label: 'נוצר על ידי' },
    { key: 'created_at', label: 'נוצר בתאריך', format: 'formatDateTime' },
    { key: 'res_by', label: 'נענה על ידי' },
    { key: 'res_at', label: 'נענה בתאריך', format: 'formatDateTime' },
  ]

  const [state, setState] = useState(kablan)
  const [columns, setColumns] = useState(headers)

  const config = {
    columns,
    setColumns,
    data: kablan,
    state,
    funcs: { formatCurrency },
    setState,
    noCheckboxs: true,
  } as ConfigT

  return (
    <div>
      <TableTopbar>
        <Search config={config} />
      </TableTopbar>

      <Table config={config} tblCls='rounded-t-none' />
    </div>
  )
}
