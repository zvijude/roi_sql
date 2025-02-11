'use client'

import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import EditMissOpts from './EditMissOpts'
import { useState } from 'react'
import { addMiss, missCompleted } from '../db/set'
import { toast } from 'zvijude/pop'

export function AddNewMiss({ missOpt, qrId, active }) {
  const [isEdit, setIsEdit] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')
    await addMiss({ qrId, item: e.target.missingItems.value, qntt: e.target.quantity.value })
    toast('success', 'החוסרים נוספו בהצלחה')
    e.target.reset()
  }

  async function onMissCompleted(id) {
    toast('loading')
    await missCompleted({ id })
    toast('success', 'החוסר הושלם בהצלחה')
  }

  return (
    <>
      <Btn lbl='הוסף חוסרים' clr='text' popoverTarget='missOptPop' className='my-2 w-full' />
      {active.length > 0 && (
        <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
          <h3 className='font-semibold text-center'>
            חוסרים פעילים <span className='text-center'>({active.length})</span>
          </h3>
          {active.map((miss, i) => (
            <div key={i} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
              <div className='flex'>
                <Btn lbl='הושלם' clr='text' className='size-5 text-xs' onClick={() => onMissCompleted(miss.id)} />
                <span>{miss.item}</span>
              </div>
              <span>{miss.qntt}</span>
            </div>
          ))}
        </div>
      )}

      <form className='pop px-4 py-6 min-w-80 ' popover='auto' id='missOptPop' onSubmit={onSubmit}>
        {!isEdit && (
          <div>
            <Select lbl='הוסף חוסרים' name='missingItems' options={missOpt} className='w-full' />
            <Input lbl='כמות' name='quantity' type='number' min='1' className='w-full' />
            <Btn
              lbl='ערוך חוסרים'
              type='button'
              clr='text'
              className='mt-1 shadow-none size-7'
              onClick={() => setIsEdit(!isEdit)}
            />
            <Btn lbl='הוסף' type='submit' className='mt-1' />
          </div>
        )}

        {isEdit && <EditMissOpts missOpt={missOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}
