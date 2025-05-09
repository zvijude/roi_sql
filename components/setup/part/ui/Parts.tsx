'use client'

import { useState } from 'react'
import PartsTable from './PartsTable'
import { toast } from 'zvijude/pop'
import Icon from 'zvijude/icon'
import { Input, Textarea } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { Part } from '@/db/types'
import { sumBy } from '@/utils/func'
import { insertPart, updatePart } from '@/components/setup/part/api'
import UploadExcelParts from '../uploadExcelParts'

export default function Parts({ prts, prjId }) {
  const [tmpObj, setTmpObj] = useState({} as TmpPart)

  async function onSave(e) {
    const data = getFormData(e) as unknown as Part

    const exist = prts.find((p) => p.name === data?.name.trim())
    if (exist) return toast('error', 'שם הפרט כבר קיים')

    toast('loading')

    const part = {
      ...data,
      name: data.name.trim(),
      qntt: Number(data.qntt),
      prjId,
    }

    const res = (await insertPart(part)) as any
    if (res.err) return toast('error')

    e?.target?.reset()
    toast('success')
  }

  async function onEditSave(e: React.SyntheticEvent) {
    const form = e.target as HTMLFormElement

    if (form.checkValidity()) {
      e.preventDefault()
      const data = new FormData(form)

      const part = {
        ...(Object.fromEntries(data) as unknown as Part),
        qntt: parseInt(data.get('qntt') as string),
      }

      const id = tmpObj.id
      await updatePart({ id, data: part })

      const popover = document.getElementById('editPop') as HTMLDivElement
      popover.hidePopover()
    }
  }

  return (
    <main className=''>
      <section className='paper max-w-4xl'>
        <form id='qntityForm' onSubmit={onSave}>
          <div className='flex items-end justify-between border-b pb-3'>
            <div className='flex'>
              <h2 className='flex'>
                <Icon name='table-list' flip type='reg' className='size-5' />
                <span className='text-xl font-semibold'>כתב כמויות לפרטים</span>
              </h2>

              <Btn
                clr='text'
                lbl='העלאת קובץ'
                iconCls='bg-green-700'
                icon='file-excel'
                popoverTarget='uploadExcel'
                type='button'
              />
            </div>

            <div className='pop' popover='manual' id='uploadExcel'>
              <UploadExcelParts prjId={prjId} />
            </div>

            <Btn lbl='שמור פרט' icon='floppy-disk' />
          </div>

          <span className='mt-8 grid grid-cols-3 gap-8'>
            <Input lbl='בחר את שם הפרט' name='name' placeholder='א-25' autoFocus={true} />
            <Input lbl='כמות הפריט בפרויקט' name='qntt' placeholder='16' type='number' />
            <span className='col-span-3'>
              <Textarea lbl='תיאור הפרט' name='desc' className='max-w-xl' />
            </span>
          </span>
        </form>
      </section>

      {prts.length > 0 && (
        <section className='max-w-6xl my-8'>
          <PartsTable rowsData={prts} setTmpObj={setTmpObj} />
          <p className='font-semibold mt-4 text-lg'>כמות פרטים בפרויקט : {sumBy(prts, 'qntt')}</p>
        </section>
      )}

      <PartFormPop tmpObj={tmpObj} onEditSave={onEditSave} key={tmpObj.id} />
    </main>
  )
}

function PartFormPop({ tmpObj, onEditSave }) {
  return (
    <div id='editPop' popover='auto' className='pop'>
      <div className='mb-8 flex gap-2 border-b pb-2'>
        <Icon name='pen-to-square' className='' />
        <h2 className=''>עריכת פרט</h2>
      </div>

      <form id='editForm' onSubmit={onEditSave} className='grid grid-cols-2 gap-8'>
        <Input lbl='בחר את שם הפרט' name='name' placeholder='א-25' defaultValue={tmpObj.name} />
        <Input lbl='סך כמות הפריט בפרויקט' name='qntt' placeholder='16' type='number' defaultValue={tmpObj.qntt} />

        <div className='col-span-2'>
          <Textarea lbl='הוסף את תיאור הפרט' name='desc' className='input col-span-3' defaultValue={tmpObj.desc} />
        </div>
        <Btn lbl='שמור עריכה' icon='floppy-disk-pen' className='col-span-2' />
      </form>
    </div>
  )
}

type TmpPart = {
  id: number
  name: string
  qntt: number
  desc: string
  tasksId?: number
  prjId?: number
}
