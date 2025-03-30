'use client'

import BtnMedia from '@/ui/BtnMedia'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { missCompleted } from './api'
import { isManager } from '@/db/types'

export default function MissCard({ missItems, userRole }) {
  async function onCompletedMedida(id) {
    toast('loading', id)
    await missCompleted({ id })
    toast('success', 'החוסרים הושלמו בהצלחה')
  }
  return (
    missItems.length > 0 && (
      <div className='border bg-white rounded-md m-1 w-3/4 mx-auto'>
        <h3 className='font-semibold text-center'>
          חוסרים <span className='text-center'>({missItems.length})</span>
        </h3>

        {missItems.map((miss) => (
          <div key={miss.id} className='flex justify-between items-center py-1 px-2 border-b last:border-0'>
            <div className='flex justify-between '>
              <span>{miss.item}</span>
              {miss.isActive && isManager(userRole) && (
                <div className='flex'>
                  <Btn lbl='הושלם' clr='text' className='size-5 text-xs' onClick={() => onCompletedMedida(miss.id)} />
                </div>
              )}
            </div>

            <div className='flex space-x-2'>
              {miss.media && <BtnMedia media={miss.media} item={miss} />}
              {miss.qntt && <span>כמות: {miss.qntt}</span>}
              {miss.note && <span>הערה: {miss.note}</span>}
            </div>
          </div>
        ))}
      </div>
    )
  )
}
