'use client'

import { MAX_MB } from '@/db/types'
import React, { useRef } from 'react'
import { Btn } from 'zvijude/btns'
import { uploadDataUrl } from 'zvijude/cloudinary/upload'
import { toast } from 'zvijude/pop'

export default function UploadMedia({ onUpload }) {
  const nativeCameraRef = useRef<HTMLInputElement>(null)
  const nativeVideoRef = useRef<HTMLInputElement>(null)

  async function onFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_MB * 1024 * 1024) {
      const fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`
      return toast(
        'error',
        `הקובץ גדול מדי, גודל מרבי הוא ${MAX_MB}MB, הקובץ שנבחר הוא ${fileSize}`
      )
    }

    toast('loading', 'מעלה מדיה...')
    const reader = new FileReader() // allow to read file content from user's device
    reader.readAsDataURL(file) // convert file to data url

    reader.onload = async function () {
      const imageDataUrl = reader.result as string
      const urls = await uploadDataUrl(imageDataUrl)
      onUpload(urls)
      toast('success', 'המדיה הועלתה בהצלחה')
    }
  }

  function openNativeCamera() {
    const isMobile = navigator.userAgent.match(/(Android|iPhone|iPad|iPod|Mobile)/g)
    // if (!isMobile) return toast('error', 'לא ניתן לצלם תמונה ממכשיר זה')
    if (nativeCameraRef.current) nativeCameraRef.current.click()
  }

  function openNativeVideo() {
    const isMobile = navigator.userAgent.match(/(Android|iPhone|iPad|iPod|Mobile)/g)
    if (!isMobile) return toast('error', 'לא ניתן לצלם וידאו ממכשיר זה')
    if (nativeVideoRef.current) nativeVideoRef.current.click()
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <Btn
        lbl="צלם תמונה"
        icon="camera"
        className="w-full"
        clr="soft"
        onClick={openNativeCamera}
        size="small"
        type='button'
      />
      <Btn
        lbl="צלם סרטון"
        icon="video"
        className="w-full"
        clr="soft"
        onClick={openNativeVideo}
        size="small"
        type='button'
      />
      <input
        ref={nativeCameraRef}
        type="file"
        accept="image/*" // allow image only
        capture="environment" // allow camera capture only (not gallery) | environment for back camera
        onChange={onFileChange}
        className="hidden"
      />
      <input
        ref={nativeVideoRef}
        type="file"
        accept="video/*" // allow video only
        capture="environment"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  )
}
