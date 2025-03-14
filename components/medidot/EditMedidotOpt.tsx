'use client'

import { useParams } from 'next/navigation'
import { Input } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { createRef } from 'react'
import { addMedidotOpt, deleteMedidaOpt } from './api'

export default function EditMedidotOpts({ medidotOpt, editSetStats }) {
  const prjId = useParams().prjId
  const inputRef = createRef<HTMLInputElement>()

  async function onAdd() {
    if (!inputRef.current) return

    const inputValue = inputRef.current.value.trim()
    if (!inputValue) return

    await addMedidotOpt(prjId, inputValue)
    inputRef.current.value = ''
  }

  async function onDelete(optVal) {
    if (!confirm('האם אתה בטוח שברצונך למחוק את האפשרות?')) return
    await deleteMedidaOpt({ optVal, prjId })
  }

  return (
    <div>
      <section className='mb-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold mb-2'>{'צור אפשרות חדשה'}</h2>
          <Btn lbl='סיים עריכה' clr='text' className='m-1 shadow-none size-7' onClick={() => editSetStats(false)} />
        </div>
        <div>
          <div className='flex justify-between items-center m-2'>
            <Input ref={inputRef} name='option' id='inputOptId' placeholder='הכנס אפשרות' />
            <Btn clr='icon' type='button' icon='plus' onClick={onAdd} />
          </div>
        </div>
      </section>
      <ol>
        {medidotOpt
          .slice()
          .reverse()
          .map((opt, index) => (
            <li key={index} className='flex items-center px-2 py-3 border-b last:border-0'>
              <span className='flex-grow'>{opt}</span>
              <div className='flex'>
                <Btn clr='icon' type='button' icon='trash' onClick={() => onDelete(opt)} />
              </div>
            </li>
          ))}
      </ol>
    </div>
  )
}
