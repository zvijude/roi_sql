'use client'
import { useState } from 'react'
import { Btn } from 'zvijude/btns'
import UploadMedia from '@/ui/UploadMedia'
import { Textarea } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'
import Icon from 'zvijude/icon'
import ImgsCom from '@/ui/imgsCom'
import { updateSkippedTask } from '../tasks/api'

export default function SkippedForm({ curTask }) {
  const [media, setMedia] = useState<string[]>([])

  async function onSubmit(e) {
    e.preventDefault()

    toast('loading')
    const data = getFormData(e)
    data.media = media
    await updateSkippedTask({ data, curTask })
    toast('success')

    setMedia([])
    e.target.reset()
    document.getElementById('skippedForm')?.hidePopover()
  }

  async function onUploadMedia(url) {
    if (!url.length) return
    setMedia([url])
  }

  return (
    <form popover='manual' id='skippedForm' className='pop w-4/5' onSubmit={onSubmit}>
      <div className='grid gap-2 w-full'>
        <button
          type='button'
          onClick={() => document.getElementById('skippedForm')?.hidePopover()}
          className='absolute top-2 left-2'
        >
          <Icon name='circle-xmark' type='sol' className='size-5 m-1' />
        </button>

        <Textarea lbl='פירוט הסיבה לדילוג' name='note' required={false} />
        <UploadMedia onUpload={onUploadMedia} />
        <Btn lbl='שלח' />
        <ImgsCom urls={media} />
      </div>
    </form>
  )
}
