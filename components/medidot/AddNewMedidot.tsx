'use client'

import { Input, Select, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { useState } from 'react'
import { toast } from 'zvijude/pop'
import EditMedidotOpts from './EditMedidotOpt'
import { addMedida, completeMedida, deleteMedida } from './api'
import UploadMedia from '@/ui/UploadMedia'
import Icon from 'zvijude/icon'
import Title from 'zvijude/general/Title'
import { arrayOf } from '@/utils/func'
import { SelectAptOpt } from '../aptOpt/ui/SelectAptOpt'
import { getFormData } from 'zvijude/form/funcs'

export function AddNewMedidot({ prjId, medidotOpt, qrId = null, aptOpt, parts }) {
  const [isEdit, setIsEdit] = useState(false)
  const [url, setUrl] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')

    const data = getFormData(e)
    data.media = url
    qrId ? await addMedida({ prjId, qrId, data }) : await addMedida({ prjId, data })
    toast('success', 'המידות נוספו בהצלחה')
    document.getElementById('medidotPop')?.hidePopover()
    e.target.reset()
  }

  // async function onDeleteMedida(id) {
  //   if (!confirm('האם אתה בטוח שברצונך למחוק את המידות?')) return
  //   toast('loading')
  //   await deleteMedida({ id })
  //   toast('success', 'המידות נמחקו בהצלחה')
  // }

  // async function onCompletedMedida(id) {
  //   toast('loading')
  //   await completeMedida({ id })
  //   toast('success', 'המידות הושלמו בהצלחה')
  // }

  return (
    <>
      <Btn lbl='הוספת מידות' popoverTarget='medidotPop' className='w-fit' icon='plus' />
      {/* {medidot.length > 0 && (
        <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
          <h3 className='font-semibold text-center'>
            מדידות <span className='text-center'>({medidot.length})</span>
          </h3>
          {medidot.map((medida, i) => (
            <div key={i} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
              <div className='flex'>
                {medida.isActive && (
                  <div className='flex'>
                    <Btn
                      icon='trash'
                      clr='icon'
                      className='size-5 border-none shadow-none'
                      onClick={() => onDeleteMedida(medida.id)}
                    />
                    <Btn lbl='הושלם' clr='text' className='size-5 text-xs' onClick={() => onCompletedMedida(medida.id)} />
                  </div>
                )}

                <span>{medida.item}</span>
              </div>
              <div className='flex space-x-2'>
                {medida?.media && <BtnMedia media={medida.media} item={medida} />}
                {medida?.width && <span>רוחב: {medida.width} מ"מ</span>}
                {medida?.height && <span>אורך: {medida.height} מ"מ</span>}
                {medida?.depth && <span>עומק: {medida.depth} מ"מ</span>}
              </div>
            </div>
          ))}
        </div>
      )} */}

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

            <section className='grid gap-4'>
              <Title lbl='הוספת מידות' icon='line' />
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
              <UploadMedia onUpload={(url) => setUrl(url)} />
            </section>
            <Btn lbl='הוסף' type='submit' className='mt-1' />
          </div>
        )}

        {isEdit && <EditMedidotOpts medidotOpt={medidotOpt} editSetStats={setIsEdit} />}
      </form>
    </>
  )
}
