'use client'

import { Input, Select, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import EditMissOpts from './EditMissOpts'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import { addMiss, deleteMiss, missCompleted } from './api'
import UploadMedia from '@/ui/UploadMedia'
import Icon from 'zvijude/icon'
import BtnMedia from '@/ui/BtnMedia'
import { getFormData } from 'zvijude/form/funcs'
import Title from 'zvijude/general/Title'
import { SelectAptOpt } from '../aptOpt/ui/SelectAptOpt'
import { arrayOf } from '@/utils/func'

export function AddNewMiss({ prjId, missOpt, qrId = null, aptOpt, parts }) {
  const [isEdit, setIsEdit] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    toast('loading')

    const data = getFormData(e)
    data.media = url
    qrId ? await addMiss({ prjId, qrId, data }) : await addMiss({ prjId, data })
    toast('success', 'החוסרים נוספו בהצלחה')

    document.getElementById('missOptPop')?.hidePopover()
    setLoading(false)
    setUrl('')
    e.target.reset()
  }

  // async function onMissCompleted(id) {
  //   setLoading(true)
  //   toast('loading')
  //   await missCompleted({ id })
  //   toast('success', 'החוסר הושלם בהצלחה')
  //   setLoading(false)
  // }

  // async function onMissDelete(id) {
  //   if (!confirm('האם אתה בטוח שברצונך למחוק את החוסר?')) return
  //   setLoading(true)
  //   toast('loading')
  //   await deleteMiss({ id })
  //   toast('success', 'החוסר נמחק בהצלחה')
  //   setLoading(false)
  // }

  return (
    <>
      <Btn lbl='הוספת חוסרים' popoverTarget='missOptPop' className='w-fit' disabled={loading} icon='plus' />

      {/* {missItems.length > 0 && (
        <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
          <h3 className='font-semibold text-center'>
            חוסרים <span className='text-center'>({missItems.length})</span>
          </h3>
          {missItems.map((miss, i) => (
            <div key={i} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
              <div className='flex'>
                {miss.isActive && (
                  <div className='flex'>
                    <Btn
                      icon='trash'
                      clr='icon'
                      className='size-5 border-none shadow-none'
                      onClick={() => onMissDelete(miss.id)}
                      disabled={loading}
                    />
                    <Btn
                      lbl='הושלם'
                      clr='text'
                      className='size-5 text-xs'
                      onClick={() => onMissCompleted(miss.id)}
                      disabled={loading}
                    />
                  </div>
                )}

                <span>{miss.item}</span>
              </div>
              <div className='flex space-x-2'>
                {miss?.media && <BtnMedia media={miss.media} item={miss} />}
                <span>כמות: {miss.qntt}</span>
              </div>
            </div>
          ))}
        </div>
      )} */}

      <form className='pop px-4 py-6 min-w-80' popover='manual' id='missOptPop' onSubmit={onSubmit}>
        <button
          type='button'
          onClick={() => {
            document.getElementById('missOptPop')?.hidePopover()
            setIsEdit(false)
          }}
          className='absolute top-1 left-1'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>

        {!isEdit && (
          <div className='grid gap-6 w-full'>
            <section className='grid gap-4'>
              <Title lbl='מיקום החוסר' icon='map-location-dot' />

              <div className='grid grid-cols-2 gap-6'>
                <Select lbl='מספר קומה' name='floor' options={arrayOf(-20, 100)} />
                <Select lbl='מספר דירה' name='aptNum' options={arrayOf(0, 1000)} />
              </div>
              <SelectAptOpt aptOpt={aptOpt} />
              <SelectObj name='partId' options={parts} show='name' val='id' lbl='בחר סוג פרט' required={false} />
              <Select lbl='בחר חזית' name='front' required={false} options={['צפונית', 'דרומית', 'מערבית', 'מזרחית']} />
            </section>

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
