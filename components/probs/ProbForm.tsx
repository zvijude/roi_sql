'use client'
import { addProb } from '@/components/events/api'
import { useState } from 'react'
import { Btn } from 'zvijude/btns'
import UploadMedia from '@/ui/UploadMedia'
import { Textarea } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'
import Icon from 'zvijude/icon'
import { useParams } from 'next/navigation'
import ImgsCom from '@/ui/imgsCom'

export default function ProblemForm({ taskId, qrId }) {
  const [media, setMedia] = useState<string[]>([])
  const prjId = useParams().prjId

  async function onSubmit(e) {
    e.preventDefault()
    if (!media.length) return toast('error', 'חובה להעלות מדיה לתיאור הבעיה!')
    if (!e.target.desc.value) return toast('error', 'חובה למלא תיאור לבעיה!')

    toast('loading', 'מעלה בעיה...')
    const data = getFormData(e)
    data.media = media

    await addProb({ ...data, type: 'PROB', taskId, qrId, prjId })
    toast('success', 'הבעיה נשלחה בהצלחה')

    setMedia([])
    e.target.reset()
    document.getElementById('problemForm')?.hidePopover()
  }

  async function onUploadProbMedia(url) {
    if (!url.length) return
    setMedia([url])
  }

  return (
    <form popover='manual' id='problemForm' className='pop w-4/5' onSubmit={onSubmit}>
      <div className='grid gap-2 w-full'>
        <button
          type='button'
          onClick={() => document.getElementById('problemForm')?.hidePopover()}
          className='absolute top-2 left-2'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>
        <Textarea lbl='פירוט הבעיה' name='desc' />
        <UploadMedia onUpload={onUploadProbMedia} />
        <Btn lbl='שלח' disabled={!media.length} />
        <p className={`${media.length && 'hidden'} text-sm text-red-700 font-semibold`}>* חובה להעלות מדיה לתיאור הבעיה</p>
        <div className={`${!media.length && 'hidden'}`}>
          <ImgsCom urls={media} />
        </div>
      </div>
    </form>
  )
}
