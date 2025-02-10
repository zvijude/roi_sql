'use client'

import { addAptOpt, deleteAptOpt } from '@/lib/aptOpt/db/set'
import { useParams, usePathname } from 'next/navigation'
import { Input } from 'zvijude/form'
import { Btn } from 'zvijude/btns'

export default function AptOpt({ aptOpt }) {
  const path = usePathname()
  const prjId = useParams().prjId

  async function onAdd() {
    const input = document.getElementById('inputOptId') as HTMLInputElement
    if (!input.value) return
    await addAptOpt(prjId, input.value)

    input.value = ''
  }

  async function onDelete(optVal) {
    if (!confirm('האם אתה בטוח שברצונך למחוק את האפשרות?')) return
    await deleteAptOpt({ optVal, path, prjId })
  }

  return (
    <div className='pop px-4 py-6 min-w-80 max-w-[90vw] max-h-[80svh] scrollbar-thin' popover='auto' id='aptOptPop'>
      <section className='mb-4'>
        <h2 className='text-lg font-bold mb-2'>{'צור אפשרות חדשה'}</h2>
        <div>
          <div className='flex gap-3'>
            <Input name='option' id='inputOptId' placeholder='הכנס אפשרות' required={false} />

            <Btn clr='icon' type='button' icon='plus' onClick={onAdd} />
          </div>
        </div>
      </section>
      <ol>
        {aptOpt
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
