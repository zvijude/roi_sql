'use client'

import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { addGlassPallet } from './api'
import Icon from 'zvijude/icon'

export function AddGlassPallet({ prj_id }) {
  async function onSubmitPallet(e) {
    e.preventDefault()
    toast('loading')

    const data = {
      floor: e.target.floor.value || null,
      apt_num: e.target.aptNum.value || null,
      front: e.target.front.value || null,
      free_loc: e.target.freeLoc.value || null,
    }

    await addGlassPallet({ prj_id, data })
    toast('success', 'משטח זכוכית נוסף בהצלחה')
    document.getElementById('glassPalletPop')?.hidePopover()
    e.target.reset()
  }

  return (
    <>
      <Btn lbl='הוסף משטח זכוכית' popoverTarget='glassPalletPop' clr='text' />
      <div id='glassPalletPop' popover='manual' className='pop px-4 py-6 min-w-80'>
        <button
          type='button'
          onClick={() => document.getElementById('glassPalletPop')?.hidePopover()}
          className='absolute top-1 left-1'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        <h3 className='text-lg font-semibold'>הוסף משטח זכוכית</h3>
        <form onSubmit={onSubmitPallet} className='grid gap-2 mt-4'>
          <Input lbl='קומה' name='floor' type='number' required={false} />
          <Input lbl='דירה' name='aptNum' type='number' required={false} />
          <Select lbl='חזית' name='front' required={false} options={['צפון', 'מזרח', 'דרום', 'מערב']} placeholder='בחר חזית' />
          <Input lbl='טקסט חופשי' name='freeLoc' type='text' required={false} />
          <Btn lbl='הוסף משטח' type='submit' className='mt-2' />
        </form>
      </div>
    </>
  )
}
