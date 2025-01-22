'use client'

import { useState } from 'react'
import { addAptOpt, updateAptOpt, deleteAptOpt } from '@/lib/aptOpt/db/set'
import { useParams, usePathname } from 'next/navigation'
import { Input } from 'zvijude/form'
import { Btn } from 'zvijude/btns'

export default function AptOpt({ aptOpt }: AptOptT) {
  const [editObj, setEditObj] = useState({ optVal: '', optId: 0, isEditing: false })
  const path = usePathname()
  const prjId = useParams().prjId

  async function onAdd() {
    const input = document.getElementById('inputOptId') as HTMLInputElement
    if (!input.value) return
    await addAptOpt({ prjId: Number(prjId), option: input.value, path })

    clearInput()
  }

  async function onSaveEdit() {
    const input = document.getElementById('inputOptId') as HTMLInputElement
    if (!input.value) return
    await updateAptOpt({ optId: editObj.optId, opt: input.value, path })

    setEditObj({ optVal: '', optId: 0, isEditing: false })
    clearInput()
  }

  async function onDelete(id) {
    await deleteAptOpt({ optId: id, path })
    setEditObj({ optVal: '', optId: 0, isEditing: false })
    clearInput()
  }

  function onCancelEdit() {
    setEditObj({ optVal: '', optId: 0, isEditing: false })
    clearInput()
  }

  function clearInput() {
    ;(document.getElementById('inputOptId') as HTMLInputElement).value = ''
  }

  return (
    <div className='pop px-4 py-6 min-w-80 max-w-[90vw] max-h-[80svh] scrollbar-thin' popover='auto' id='aptOptPop'>
      <section className='mb-4'>
        <h2 className='text-lg font-bold mb-2'>
          {editObj.isEditing ? `ערוך אפשרות "${editObj.optVal}"` : 'צור אפשרות חדשה'}
        </h2>
        <div>
          <div className='flex gap-3'>
            <Input
              name='option'
              id='inputOptId'
              defaultValue={editObj.optVal}
              key={editObj.optId}
              placeholder='הכנס אפשרות'
              required={false}
            />
            {editObj.isEditing ? (
              <>
                <Btn clr='icon' type='button' icon='xmark' onClick={onCancelEdit} />
                <Btn clr='icon' type='button' icon='check' onClick={onSaveEdit} />
              </>
            ) : (
              <Btn clr='icon' type='button' icon='plus' onClick={onAdd} />
            )}
          </div>
        </div>
      </section>
      <ol>
        {aptOpt
          .slice()
          .reverse()
          .map((opt) => (
            <li key={opt.id} className='flex items-center px-2 py-3 border-b last:border-0'>
              <span className='flex-grow '>{opt.option}</span>
              <div className='flex'>
                <button
                  type='button'
                  onClick={() => setEditObj({ optVal: opt.option, optId: opt.id, isEditing: true })}>
                  ערוך
                </button>
                <button type='button' onClick={() => onDelete(opt.id)}>
                  מחק
                </button>
              </div>
            </li>
          ))}
      </ol>
    </div>
  )
}

type AptOptT = {
  aptOpt: { id: number; option: string }[]
}
