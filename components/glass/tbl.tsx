'use client'

import { useState } from 'react'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import TableTopbar from 'zvijude/table/TableTopbar'
import ExportTable from 'zvijude/table/export'

export default function GlassTable({ data }) {
  const headers = [
    { key: 'palletName', label: 'משטח זכוכית' },
    { key: 'props', label: 'מאפיינים' },
    { key: 'loc', label: 'מיקום' },
    { key: 'qntt', label: 'כמות' },
    { key: 'width', label: 'רוחב (מ"מ)' },
    { key: 'height', label: 'גובה (מ"מ)' },
    { key: 'thick', label: 'עובי (מ"מ)' },
    { key: 'note', label: 'הערה' },
    { key: 'createdAt', label: 'נוצר בתאריך', format: 'formatDateTime' },
  ]

  function formatPallet(data) {
    let formattedData = [] as any
    let lastPalletName = null

    data.forEach((d) => {
      if (lastPalletName !== null && lastPalletName !== d.palletName) {
        formattedData.push({
          palletName: '',
          props: '',
          loc: '',
          qntt: '',
          width: '',
          height: '',
          thick: '',
          note: '',
          createdAt: '',
        })
      }
      formattedData.push(d)
      lastPalletName = d.palletName
    })

    return formattedData
  }

  const [state, setState] = useState(formatPallet(data))
  const [columns, setColumns] = useState(headers)

  const config = {
    columns,
    setColumns,
    data,
    noCheckboxs: true,
    state,
    setState,
  } as ConfigT

  return (
    <>
      <TableTopbar className='justify-between'>
        <Search config={config} />
        <div className='flex gap-2'>
          <ExportTable data={data} columns={headers} />
        </div>
      </TableTopbar>
      <Table config={config} tblCls='rounded-t-none' />
    </>
  )
}
