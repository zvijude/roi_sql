'use client'

import BtnMedia from '@/ui/BtnMedia'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { completeMedida } from './api'
import { isManager } from '@/db/types'

export default function MedidotCard({ medidot, userRole }) {
  async function onCompletedMedida(id) {
    toast('loading', id)
    await completeMedida({ id })
    toast('success', 'המידות הושלמו בהצלחה')
  }
  return (
    medidot.length > 0 && (
      <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
        <h3 className='font-semibold text-center'>
          מדידות <span className='text-center'>({medidot.length})</span>
        </h3>

        {medidot.map((medida) => (
          <div key={medida.id} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
            <div className='flex justify-between '>
              <span>{medida.item}</span>
              {medida.isActive && isManager(userRole) && (
                <div className='flex'>
                  <Btn lbl='הושלם' clr='text' className='size-5 text-xs' onClick={() => onCompletedMedida(medida.id)} />
                </div>
              )}
            </div>

            <div className='flex space-x-2'>
              {medida.media && <BtnMedia media={medida.media} item={medida} />}
              {medida.width && <span>רוחב: {medida.width} מ"מ</span>}
              {medida.height && <span>אורך: {medida.height} מ"מ</span>}
              {medida.depth && <span>עומק: {medida.depth} מ"מ</span>}
            </div>
          </div>
        ))}
      </div>
    )
  )
}
