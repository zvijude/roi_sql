'use client'

import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import EditMissOpts from './EditMissOpts'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import { addMiss, deleteMiss, missCompleted } from './api'
import UploadMedia from '@/ui/UploadMedia'
import Icon from 'zvijude/icon'
import BtnMedia from '@/ui/BtnMedia'

export function AddNewMiss({ missOpt, qrId, active }) {
  const [isEdit, setIsEdit] = useState(false)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    toast('loading')

    const item = e.target.missingItems.value
    const qntt = Number(e.target.quantity.value)

    await addMiss({ qrId, item, qntt, media: url })
    toast('success', 'החוסרים נוספו בהצלחה')

    document.getElementById('missOptPop')?.hidePopover()
    setLoading(false)
    setUrl('')
    e.target.reset()
  }

  async function onMissCompleted(id) {
    setLoading(true)
    toast('loading')
    await missCompleted({ id })
    toast('success', 'החוסר הושלם בהצלחה')
    setLoading(false)
  }

  async function onMissDelete(id) {
    if (!confirm('האם אתה בטוח שברצונך למחוק את החוסר?')) return
    setLoading(true)
    toast('loading')
    await deleteMiss({ id })
    toast('success', 'החוסר נמחק בהצלחה')
    setLoading(false)
  }

  return (
    <>
      <Btn lbl='הוסף חוסרים' clr='text' popoverTarget='missOptPop' className='my-2 w-3/4 mx-auto mt-8' disabled={loading} />

      {active.length > 0 && (
        <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
          <h3 className='font-semibold text-center'>
            חוסרים פעילים <span className='text-center'>({active.length})</span>
          </h3>
          {active.map((miss, i) => (
            <div key={i} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
              <div className='flex'>
                { !miss.isActive && <div className='flex'>
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
                </div>}

                <span>{miss.item}</span>
              </div>
              <div className='flex space-x-2'>
                {miss?.media && <BtnMedia media={miss.media} item={miss} />}
                <span>כמות: {miss.qntt}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <form className='pop px-4 py-6 min-w-80 ' popover='manual' id='missOptPop' onSubmit={onSubmit}>
        <button
          type='button'
          onClick={() => document.getElementById('missOptPop')?.hidePopover()}
          className='absolute top-1 left-1'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        {!isEdit && (
          <div className='grid gap-2 w-full'>
            <div className='grid'>
              <Select lbl='הוסף חוסרים' name='missingItems' options={missOpt} className='w-full' disabled={loading} />
              <Btn
                lbl='ערוך חוסרים'
                type='button'
                clr='text'
                className='shadow-none size-6 text-xs'
                onClick={() => setIsEdit(!isEdit)}
                disabled={loading}
              />
            </div>

            <Input lbl='כמות' name='quantity' type='number' min='1' className='w-full' required disabled={loading} />
            <UploadMedia onUpload={(url) => setUrl(url)} setLoading={setLoading} />

            <Btn lbl='הוסף' type='submit' className='mt-1' disabled={loading} />
          </div>
        )}

        {isEdit && <EditMissOpts missOpt={missOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}
