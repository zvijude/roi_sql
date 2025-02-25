'use client'

import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import { addMeasure, deleteMeasure } from '../db/set'
import EditMeasureOpts from './EditMeasureOpts'

export function AddNewMeasure({ measureOpt, measures, qrId }) {
  const [isEdit, setIsEdit] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')
    const item = e.target.measureItem.value
    const { width, height, depth } = e.target
    const data = {
      width: width.value ? Number(width.value) : null,
      height: height.value ? Number(height.value) : null,
      depth: depth.value ? Number(depth.value) : null,
    }
    await addMeasure({ qrId, item, data })
    toast('success', 'המידות נוספו בהצלחה')
    e.target.reset()
  }

  async function onDelMeasure(id) {
    if (!confirm('האם אתה בטוח שברצונך למחוק את המידות?')) return
    toast('loading')
    await deleteMeasure({ id })
    toast('success', 'המידות נמחקו בהצלחה')
  }

  return (
    <>
      <Btn lbl='הוסף מידות' clr='text' popoverTarget='measureOptPop' className='my-2 w-3/4 mx-auto mt-8' />
      {measures.length > 0 && (
        <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
          {measures.map((measure, i) => (
            <div key={i} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
              <div className='flex'>
                <Btn icon='trash' size='small' clr='icon' className='cursor-pointer' onClick={() => onDelMeasure(measure.id)} />
                <span>{measure.item}</span>
              </div>
              <div className='flex space-x-2'>
                {measure?.width && <span>רוחב: {measure.width} מ"מ</span>}
                {measure?.height && <span>אורך: {measure.height} מ"מ</span>}
                {measure?.depth && <span>עומק: {measure.depth} מ"מ</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <form className='pop px-4 py-6 min-w-80 ' popover='auto' id='measureOptPop' onSubmit={onSubmit}>
        {!isEdit && (
          <div>
            <Select lbl='הוסף מידות במ"מ' name='measureItem' options={measureOpt} placeholder='בחר סוג מידה' className='w-full' />

            <Input lbl='רוחב' name='width' type='number' min={0} className='w-full' required={false} />
            <Input lbl='אורך' name='height' type='number' min={0} className='w-full' required={false} />
            <Input lbl='עומק' name='depth' type='number' min={0} className='w-full' required={false} />

            <Btn
              lbl='ערוך מידות'
              type='button'
              clr='text'
              className='mt-1 shadow-none size-7'
              onClick={() => setIsEdit(!isEdit)}
            />
            <Btn lbl='הוסף' type='submit' className='mt-1' />
          </div>
        )}

        {isEdit && <EditMeasureOpts measureOpt={measureOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}
