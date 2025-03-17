'use client'
import { Btn } from 'zvijude/btns'
import { Textarea } from 'zvijude/form'
import { toast } from 'zvijude/pop'
import { setTaskCompletion } from '@/components/tasks/api'
import Icon from 'zvijude/icon'
import UploadMedia from '@/ui/UploadMedia'
import { useState } from 'react'
import { getFormData } from 'zvijude/form/funcs'

export default function TaskCompletionForm({ curTask, qrStatus }) {
  const [media, setMedia] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')

    const data = getFormData(e)
    data.media = media

    await setTaskCompletion(curTask, data)
    if (curTask.needApproval) {
      toast('success', 'המשימה הושלמה וממתינה לאישור')
    } else toast('success', 'המשימה הושלמה')

    document.getElementById('completedTaskPop')?.hidePopover()
    setMedia('')

    e.target.reset()
  }
  async function onUpload(urls) {
    setMedia(urls)
  }

  return (
    <form popover='manual' id='completedTaskPop' className='pop w-4/5' onSubmit={onSubmit}>
      <div className='grid gap-2 w-full'>
        <button
          type='button'
          onClick={() => document.getElementById('completedTaskPop')?.hidePopover()}
          className='absolute top-2 left-2'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        <Textarea lbl='הוסף הערה על המשימה' name='note' placeholder='המשימה הושלמה...' required={false} />
        <UploadMedia onUpload={onUpload} />
        <Btn lbl='סיים משימה' className='w-full my-1' />
      </div>
    </form>
  )
}
