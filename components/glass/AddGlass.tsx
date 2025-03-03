'use client'

import { Input, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { addGlass } from './api'
import Icon from 'zvijude/icon'

export function AddGlass({ glass_pallets }) {
  async function onSubmitGlass(e) {
    e.preventDefault()
    toast('loading')

    const data = {
      qntt: e.target.qntt.value ? Number(e.target.qntt.value) : null,
      height: e.target.height.value ? Number(e.target.height.value) : null,
      width: e.target.width.value ? Number(e.target.width.value) : null,
      note: e.target.note.value || null,
      glass_pallet_id: e.target.glass_pallet_id.value,
    }

    await addGlass({ data })
    toast('success', 'זכוכית נוספה בהצלחה')
    document.getElementById('glassPop')?.hidePopover()
    e.target.reset()
  }

  return (
    <>
      <Btn lbl='הוסף זכוכית' popoverTarget='glassPop' clr='text' />

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
          <Input lbl='גובה (מילימטר)' name='height' type='number' required={false} />
          <Input lbl='רוחב (מילימטר)' name='width' type='number' required={false} />
          <Input lbl='הערה' name='note' type='text' required={false} />
          <SelectObj lbl='משטח זכוכית' name='glass_pallet_id' options={glass_pallets} val='glass_pallet_id' show='loc' />
          <Btn lbl='הוסף זכוכית' type='submit' className='mt-2' />
        </form>
      </div>
    </>
  )
}
