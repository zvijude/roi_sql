'use client'

import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import EditMedidotOpts from './EditMedidotOpt'
import { addMedida, completeMedida, deleteMedida } from './api'
import UploadMedia from '@/ui/UploadMedia'
import Icon from 'zvijude/icon'

export function AddNewMedidot({ medidotOpt, medidot, qrId }) {
  const [isEdit, setIsEdit] = useState(false)
  const [url, setUrl] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')
    const item = e.target.medidotVal.value
    const { width, height, depth } = e.target
    const data = {
      width: width.value ? Number(width.value) : null,
      height: height.value ? Number(height.value) : null,
      depth: depth.value ? Number(depth.value) : null,
      media: url,
    }
    await addMedida({ qrId, item, data })
    toast('success', 'המידות נוספו בהצלחה')
    document.getElementById('medidotPop')?.hidePopover()
    e.target.reset()
  }

  async function onDeleteMedida(id) {
    if (!confirm('האם אתה בטוח שברצונך למחוק את המידות?')) return
    toast('loading')
    await deleteMedida({ id })
    toast('success', 'המידות נמחקו בהצלחה')
  }

  async function onCompletedMedida(id) {
    toast('loading')
    await completeMedida({ id })
    toast('success', 'המידות הושלמו בהצלחה')
  }

  return (
    <>
      <Btn lbl='הוסף מידות' clr='text' popoverTarget='medidotPop' className='my-2 w-3/4 mx-auto mt-8' />
      {medidot.length > 0 && (
        <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
          <h3 className='font-semibold text-center'>
            מדידות פעילות <span className='text-center'>({medidot.length})</span>
          </h3>
          {medidot.map((medida, i) => (
            <div key={i} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
              <div className='flex'>
                <Btn
                  icon='trash'
                  clr='icon'
                  className='size-5 border-none shadow-none'
                  onClick={() => onDeleteMedida(medida.id)}
                />
                <Btn lbl='הושלם' clr='text' className='size-5 text-xs' onClick={() => onCompletedMedida(medida.id)} />
                <span>{medida.item}</span>
              </div>
              <div className='flex space-x-2'>
                {medida?.media && formatMedia(medida.media, medida)}
                {medida?.width && <span>רוחב: {medida.width} מ"מ</span>}
                {medida?.height && <span>אורך: {medida.height} מ"מ</span>}
                {medida?.depth && <span>עומק: {medida.depth} מ"מ</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      <form className='pop px-4 py-6 min-w-80 ' popover='manual' id='medidotPop' onSubmit={onSubmit}>
        <button
          type='button'
          onClick={() => document.getElementById('medidotPop')?.hidePopover()}
          className='absolute top-1 left-1'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        {!isEdit && (
          <div className='grid gap-2 w-full'>
            <div className='grid'>
              <Select
                lbl='הוסף מידות במ"מ'
                name='medidotVal'
                options={medidotOpt}
                placeholder='בחר סוג מידה'
                className='w-full'
              />
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
            <UploadMedia onUpload={(url) => setUrl(url)} />

            <Btn lbl='הוסף' type='submit' className='mt-1' />
          </div>
        )}

        {isEdit && <EditMedidotOpts measureOpt={medidotOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}

function formatMedia(media, item) {
  if (!media?.[0]) return null
  return (
    <>
      <Btn icon='image' popoverTarget={`popMedia-${item.id}`} clr='icon' className='size-7 border-none shadow-none' />
      <div popover='auto' id={`popMedia-${item.id}`} className='pop size-96'>
        <img src={media} alt='' />
      </div>
    </>
  )
}
