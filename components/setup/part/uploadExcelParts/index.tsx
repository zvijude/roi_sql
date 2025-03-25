'use client'

import Title from 'zvijude/general/Title'
import InputFile from './InputFile'
import { useState } from 'react'
import { getUser } from '@/auth/authFuncs'
import { uploadClientData } from './api'
import { insertManyParts } from '../api'
import Icon from 'zvijude/icon'

export default function UploadExcelParts({ prjId }) {
  const [clients, setClients] = useState<Record<string, any>[]>()
  const [wrongClients, setWrongClients] = useState<Record<string, any>[]>()

  async function onChange(e) {
    const file = e.target?.files?.[0]
    if (!file) return
    const { data, wrongData } = await uploadClientData(file, prjId)
    e.target.value = ''

    console.log('data', data)
    console.log('wrongData', wrongData)

    setClients(data)
    setWrongClients(wrongData)

    if (data.length > 0) await insertManyParts(data)
  }

  return (
    <div className='card w-fit relative'>
      <button className='absolute top-0 left-0 font-bold text-xl' popoverTarget='uploadExcel' type='button'>
        <Icon name='circle-xmark' className='bg-red-700' />
      </button>
      <Title lbl='העלאת כתב כמויות' icon='file-excel' />
      <div className='my-4 mb-6 font-semibold'>
        <p>רק קובץ בפורמט excel, סיומת xlsx,xls</p>
        <p>שורה ראשונה בקובץ:</p>
        <p> עמודות: פרט, תיאור, כמות</p>
      </div>

      <InputFile required lbl='העלאת קובץ excel' accept='.xlsx,.xls' onChange={onChange} clr='solid' />

      <div className='grid gap-8 grid-cols-2 mt-4'>
        {clients && (
          <div>
            <h1 className='underline mb-1 text-green-800 font-semibold'>פרטים שנשמרו בהצלחה</h1>
            {clients?.map((c, i) => (
              <div key={i} className='flex gap-2'>
                <p>פרט: {c.name}</p>
                {/* <p>{c.desc}</p>
                <p>{c.qntt}</p> */}
              </div>
            ))}
          </div>
        )}

        {wrongClients && (
          <div>
            <h1 className='underline mb-1 text-red-800 font-semibold'>מידע לא תקין, לא נשמר</h1>
            {wrongClients?.map((c, i) => (
              <div key={i} className='flex gap-2'>
                <p>פרט: {c.name}</p>
                {/* <p>{c.desc}</p>
                <p>{c.qntt}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
