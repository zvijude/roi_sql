'use client'

import { Input, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { addGlass } from './api'
import Icon from 'zvijude/icon'
import { getFormData } from 'zvijude/form/funcs'

export function AddGlass({ pallets, glassInfo }) {
  async function onSubmitGlass(e) {
    e.preventDefault()
    toast('loading')

    const data = getFormData(e)
    await addGlass({ data })
    toast('success', 'זכוכית נוספה בהצלחה')
    document.getElementById('glassPop')?.hidePopover()
    e.target.reset()
  }

  return (
    <>
      <Btn lbl='הוספת זכוכית' popoverTarget='glassPop' clr='text' icon='plus' />

      <div id='glassPop' popover='manual' className='pop px-4 py-6 min-w-80'>
        <button
          type='button'
          onClick={() => document.getElementById('glassPop')?.hidePopover()}
          className='absolute top-1 left-1'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        <h3 className='text-lg font-semibold'>הוסף זכוכית</h3>
        <form onSubmit={onSubmitGlass} className='grid gap-2 mt-4'>
          <Input lbl="כמות (יח')" name='qntt' type='number' required={false} />
          <Input lbl='הערה' name='note' type='text' required={false} />
          <SelectObj lbl='זכוכית' name='glassInfoId' options={glassInfo} val='id' show='name' placeholder='בחר זכוכית' />
          <SelectObj lbl='משטח זכוכית' name='palletId' options={pallets} val='id' show='nameLoc' placeholder='בחר משטח' />
          <Btn lbl='הוסף זכוכית' type='submit' className='mt-2' />
        </form>
      </div>
    </>
  )
}
