'use client'

import { Input, Select, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import EditMedidotOpts from './EditMedidotOpt'
import { addMedida } from './api'
import UploadMedia from '@/ui/UploadMedia'
import Icon from 'zvijude/icon'
import Title from 'zvijude/general/Title'
import { arrayOf } from '@/utils/func'
import { SelectAptOpt } from '../aptOpt/ui/SelectAptOpt'
import { getFormData } from 'zvijude/form/funcs'

export function AddNewMedidot({ prjId, medidotOpt, qr = null as any | null, aptOpt, parts }) {
  const [isEdit, setIsEdit] = useState(false)
  const [url, setUrl] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')

    const data = getFormData(e)
    data.media = url
    if (qr) {
      data.front = qr.front
      data.floor = qr.floor
      data.aptNum = qr.aptNum
      data.locInApt = qr.locInApt
      data.qrId = qr.QrId
    }
    qr ? await addMedida({ prjId, qr, data }) : await addMedida({ prjId, data })
    toast('success', 'המידות נוספו בהצלחה')
    document.getElementById('medidotPop')?.hidePopover()
    e.target.reset()
    setUrl('')
  }

  return (
    <>
      <Btn lbl='הוספת מדידה' popoverTarget='medidotPop' icon='plus' clr='text' size='small' className='w-full' />

      <form className='pop px-4 py-6 min-w-80 ' popover='manual' id='medidotPop' onSubmit={onSubmit}>
        <button
          type='button'
          onClick={() => {
            document.getElementById('medidotPop')?.hidePopover()
            setIsEdit(false)
          }}
          className='absolute top-1 left-1'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        {!isEdit && (
          <div className='grid gap-6 w-full'>
            {!qr && (
              <section className='grid gap-4'>
                <Title lbl='מיקום הפריט' icon='map-location-dot' />

                <div className='grid grid-cols-2 gap-6'>
                  <Select lbl='מספר קומה' name='floor' options={arrayOf(-3, 100)} />
                  <Select lbl='מספר דירה' name='aptNum' options={arrayOf(0, 1000)} />
                </div>
                <SelectAptOpt aptOpt={aptOpt} />
                <SelectObj name='partId' options={parts} show='name' val='id' lbl='בחר סוג פרט' required={false} />

                <Select lbl='בחר חזית' name='front' required={false} options={['צפונית', 'דרומית', 'מערבית', 'מזרחית']} />
              </section>
            )}
            <section className='grid gap-4'>
              <Title lbl='הוספת מדידה' icon='line' />
              <div className='grid'>
                <Select name='item' options={medidotOpt} lbl='בחר סוג מידה' className='w-full' />
                <Btn
                  lbl='ערוך מידות'
                  type='button'
                  clr='text'
                  className='shadow-none size-6 text-xs'
                  onClick={() => setIsEdit(!isEdit)}
                />
              </div>
              <Input lbl='רוחב' name='width' type='number' min={0} className='w-full' required={false} />
              <Input lbl='אורך' name='height' type='number' min={0} className='w-full' required={false} />
              <Input lbl='עומק' name='depth' type='number' min={0} className='w-full' required={false} />
              <Input lbl='הערה' name='note' type='text' className='w-full' required={false} />
              <UploadMedia
                onUpload={(url) => {
                  setUrl(url)
                }}
              />
            </section>
            <Btn lbl='הוסף' type='submit' className='mt-1' />
          </div>
        )}

        {isEdit && <EditMedidotOpts medidotOpt={medidotOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}
