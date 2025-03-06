import { useState } from 'react'
import { Btn } from 'zvijude/btns'
import UploadMedia from '@/ui/UploadMedia'
import { Textarea, Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'
import Icon from 'zvijude/icon'
import { useParams } from 'next/navigation'
import { addProb } from '@/components/events/api'
import ImgsCom from '@/ui/imgsCom'

export default function BgtReqForm({ taskId, qrId }) {
  const [media, setMedia] = useState<string[]>([])
  const prjId = useParams().prjId

  async function onSubmit(e) {
    e.preventDefault()
    if (!media.length) return toast('error', 'חובה להעלות מדיה לתיאור החריגה!')
    if (!e.target.desc.value) return toast('error', 'חובה למלא תיאור לחריגה!')
    if (!e.target.price.value) return toast('error', 'חובה למלא סכום לחריגה!')

    toast('loading', 'שולח בקשת חריגים...')
    const data = getFormData(e)
    data.media = media
    await addProb({ type: 'BGT_REQ', taskId, qrId, prjId, ...data })
    toast('success', 'הבקשה נשלחה בהצלחה')

    setMedia([])
    e.target.reset()
    document.getElementById('bgtReqForm')?.hidePopover()
  }

  async function onUploadMedia(url) {
    if (!url.length) return
    setMedia([url])
  }

  return (
    <form popover='manual' id='bgtReqForm' className='pop w-4/5' onSubmit={onSubmit}>
      <div className='grid gap-2 w-full'>
        <button
          type='button'
          onClick={() => document.getElementById('bgtReqForm')?.hidePopover()}
          className='absolute top-2 left-2'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>

        <Textarea lbl='פירוט החריגה' name='desc' />
        <Input lbl='מחיר החריגה' type='number' min={0} name='price' placeholder='10,000 שח' />
        <UploadMedia onUpload={onUploadMedia} />
        <Btn lbl='שלח' disabled={!media.length} type='button' />
        <p className={`${media.length && 'hidden'} text-sm text-red-700 font-semibold`}>* חובה להעלות מדיה לתיאור החריגה</p>
        <div className={`${!media.length && 'hidden'}`}>
          <ImgsCom urls={media} />
        </div>
      </div>
    </form>
  )
}
