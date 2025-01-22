'use client'

import { arrayOf } from '@/utils/func'
import { insertQr, QrData } from '@/lib/qr/db/set'
import { Select, SelectObj } from 'zvijude/form'
import { SelectAptOpt } from '@/lib/aptOpt/ui/SelectAptOpt'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'
import { Btn } from 'zvijude/btns'
import Title from 'zvijude/general/Title'
import { useState } from 'react'
import { getTasksByPart } from '@/lib/part/db/get'

export default function LocationForm({ qrNum, aptOpt, parts }) {
  const [tasks, setTasks] = useState([]) as any
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    const data = getFormData(e) as QrData
    if (
      !confirm(`
        האם אתה בטוח שברצונך לשמור את הפרטים הבאים?
        קומה: ${data.floor}
        דירה: ${data.aptNum}
        סוג פרט: ${JSON.parse(data.prt).name}
        חזית: ${data.front ? data.front : 'לא נבחרה'}`)
    )
      return
    toast('loading')
    await insertQr({ ...data, qrNum })
    toast('success')
  }

  async function onChangePrt(e) {
    setTasks([])
    setIsLoading(true)
    if (!e.target.value) return setTasks([])
    const prt = JSON.parse(e.target.value)
    const tasks = await getTasksByPart(prt.id)

    setTasks(tasks || [])
    setIsLoading(false)
  }

  return (
    <main className='mt-6'>
      <form onSubmit={onSubmit} className='grid gap-4'>
        <Title lbl='מיקום הפריט' icon='map-location-dot' />
        <div className='grid grid-cols-2 gap-6'>
          <Select lbl='מספר קומה' name='floor' options={arrayOf(-20, 100)} defaultValue='1' />
          <Select lbl='מספר דירה' name='aptNum' options={arrayOf(0, 1000)} defaultValue='1' />
        </div>
        <SelectAptOpt aptOpt={aptOpt} />
        <SelectObj
          lbl='סוג הפרט'
          name='prt'
          options={parts}
          returnJson
          show='name'
          placeholder='בחר סוג פרט'
          onChange={onChangePrt}
        />
        <Select
          lbl='חזית'
          placeholder='בחר חזית'
          name='front'
          required={false}
          options={['צפונית', 'דרומית', 'מערבית', 'מזרחית']}
        />

        <SelectObj
          lbl='שלב התקנה נוכחי'
          name='taskStageId'
          options={tasks}
          val='id'
          show='title'
          placeholder={
            isLoading ? 'טוען...' : tasks.length !== 0 ? 'בחר שלב ביצוע' : 'לקביעת שלב, בחר פרט'
          }
          required={false}
        />

        <Btn lbl='שמור' icon='floppy-disk' className='w-full' />
      </form>
    </main>
  )
}
