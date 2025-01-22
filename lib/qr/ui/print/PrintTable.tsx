'use client'

import { useEffect, useRef, useState } from 'react'
import { Btn } from 'zvijude/btns'
import { checkedIds } from 'zvijude/table/funcs'
import Search from 'zvijude/table/Search'
import Table, { ConfigT } from 'zvijude/table'
import QrImg from './QrImg'
import { useReactToPrint } from 'react-to-print'
import { Input } from 'zvijude/form'
import { arrayOf } from '@/utils/func'
import { getFormData } from 'zvijude/form/funcs'
import TableTopbar from 'zvijude/table/TableTopbar'

export default function PrintTable({ qrs, prjId, prjName, printQntt }) {
  const headers = [
    { key: 'qrNum', label: 'QR' },
    { key: 'part.name', label: 'פרט' },
    { key: 'part.desc', label: 'תיאור הפרט' },
    { key: 'part.qntt', label: 'כמות במלאי' },
    { key: 'floor', label: 'קומה' },
    { key: 'aptNum', label: 'מספר דירה' },
    { key: 'locInApt', label: 'מיקום בדירה' },
  ]

  const [selectedQrs, setSelectedQrs] = useState<number[]>([])

  const ref = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ content: () => ref.current })

  useEffect(() => {
    if (selectedQrs.length) handlePrint()
  }, [selectedQrs])

  function printIds() {
    const qrNums = checkedIds().map((id) => qrs.find((qr) => qr.id === id).qrNum)
    setSelectedQrs([...qrNums])
  }

  function onPrintQntt(e) {
    const { num1, num2 } = getFormData(e) as { num1: string; num2: string }

    const arrToPrint = arrayOf(Number(num1), Number(num2) + 1)
    setSelectedQrs(arrToPrint)
  }

  const [state, setState] = useState(qrs)
  const [columns, setColumns] = useState(headers)
  const config = { columns, setColumns, data: qrs, state, setState } as ConfigT

  return (
    <div>
      <form className='flex items-end mb-8 gap-3' onSubmit={onPrintQntt}>
        <Input
          className='w-28'
          lbl='הדפס מברקוד'
          placeholder='מספר ברקוד'
          type='number'
          name='num1'
        />
        <Input className='w-28' lbl='עד ברקוד' placeholder='מספר ברקוד' type='number' name='num2' />
        <Btn lbl='הדפס כמות ברקודים' icon='print' />
      </form>

      <TableTopbar>
        <Search config={config} />
        <Btn lbl='הדפס' onClick={printIds} clr='text' />
      </TableTopbar>

      <div className='hidden'>
        <div id='content' ref={ref} dir='rtl'>
          {selectedQrs.map((qrNum) => (
            <QrImg key={qrNum} qrNum={qrNum} prjId={prjId} prjName={prjName} />
          ))}
        </div>
      </div>

      <Table config={config} />
    </div>
  )
}
