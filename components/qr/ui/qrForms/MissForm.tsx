'use client'

import { Input, Select, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import EditMissOpts from '../../../missing/EditMissOpts'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import { addMiss } from '../../../missing/api'
import UploadMedia from '@/ui/UploadMedia'
import Icon from 'zvijude/icon'
import { getFormData } from 'zvijude/form/funcs'
import Title from 'zvijude/general/Title'
import { SelectAptOpt } from '../../../aptOpt/ui/SelectAptOpt'
import { arrayOf } from '@/utils/func'

export function MissForm({ prjId, missOpt, qr = null as any | null, aptOpt, parts }) {
  const [isEdit, setIsEdit] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
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
    qr ? await addMiss({ prjId, qrId: qr.QrId, data }) : await addMiss({ prjId, data })
    toast('success', 'החוסרים נוספו בהצלחה')

    document.getElementById('missForm')?.hidePopover()
    setLoading(false)
    setUrl('')
    e.target.reset()
  }

  return (
    <>
      <form className='pop px-4 py-6 min-w-80' popover='manual' id='missForm' onSubmit={onSubmit}>
        <button
          type='button'
          onClick={() => {
            document.getElementById('missForm')?.hidePopover()
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
                <Title lbl='מיקום החוסר' icon='map-location-dot' />

                <div className='grid grid-cols-2 gap-6'>
                  {/* <Select lbl='מספר קומה' name='floor' options={arrayOf(-20, 100)} /> */}
                   <Input lbl='מספר קומה' name='floor' type='number' min={-5} />
                  <Select lbl='מספר דירה' name='aptNum' options={arrayOf(0, 1000)} />
                </div>
                <SelectAptOpt aptOpt={aptOpt} />
                <SelectObj name='partId' options={parts} show='name' val='id' lbl='בחר סוג פרט' required={false} />
                <Select lbl='בחר חזית' name='front' required={false} options={['צפונית', 'דרומית', 'מערבית', 'מזרחית']} />
              </section>
            )}

            <section className='grid gap-4'>
              <Title lbl='הוסף חוסרים' icon='box-open' />
              <div className='grid'>
                <Select lbl='בחר פריט' name='item' options={missOpt} className='w-full' />
                <Btn
                  lbl='ערוך חוסרים'
                  type='button'
                  clr='text'
                  className='shadow-none size-6 text-xs'
                  onClick={() => setIsEdit(!isEdit)}
                />
              </div>
              <Input lbl='כמות' name='qntt' type='number' min='1' className='w-full' required disabled={loading} />
              <Input lbl='הערה' name='note' type='text' className='w-full' required={false} disabled={loading} />
              <UploadMedia onUpload={(url) => setUrl(url)} setLoading={setLoading} />
            </section>

            <Btn lbl='הוסף' type='submit' className='mt-1' disabled={loading} />
          </div>
        )}

        {isEdit && <EditMissOpts missOpt={missOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}
