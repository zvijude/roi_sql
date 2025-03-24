'use client'
import { Btn } from 'zvijude/btns'
import { Textarea } from 'zvijude/form'
import { toast } from 'zvijude/pop'
import { setTaskCompletion } from '@/components/tasks/api'
import Icon from 'zvijude/icon'
import UploadMedia from '@/ui/UploadMedia'
import { useState } from 'react'
import { getFormData } from 'zvijude/form/funcs'
import ImgsCom from '@/ui/imgsCom'

export default function TaskCompletionForm({ curTask }) {
  const [media, setMedia] = useState<string[]>([])
  const isSolvedMedia = (curTask.needMedia && media.length > 0) || !curTask.needMedia

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
    setMedia([])

    e.target.reset()
  }
  async function onUpload(url) {
    setMedia([...media, url])
  }
  return (
    <form popover='manual' id='completedTaskPop' className='pop' onSubmit={onSubmit}>
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
        <Btn lbl='סיים משימה' className='w-full my-1' disabled={!isSolvedMedia} />
        <p className={`${isSolvedMedia && 'hidden'} text-sm text-red-700 font-semibold`}>* חובה להעלות מדיה לתיאור הבעיה</p>
        {media.length > 0 && <ImgsCom urls={media} />}
      </div>
    </form>
  )
}
