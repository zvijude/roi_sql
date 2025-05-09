'use client'

import { useState } from 'react'
import { BtnProps, FileBtn } from './FileBtn'

export default function InputFile({
  multiple = false,
  required = false,
  accept,
  name = '',
  onChange,
  ...props
}: BtnProps & { multiple?: boolean; required?: boolean; name?: string; accept?: string; onChange?: (e) => void }) {
  const [fileNames, setFileNames] = useState<any>()

  async function onFileChange(e) {
    const fileList = Array.from(e.target.files) as File[]
    const tmp = fileList.map((file, i) => {
      return (
        <div key={i}>
          <p className='text-sm text-gray-700 mt-px truncate max-w-40'>{file.name}</p>
        </div>
      )
    })

    setFileNames(tmp)
    if (onChange) onChange(e)
  }

  return (
    <div>
      <FileBtn lbl='העלאת קובץ' icon='upload' clr='text' {...props}>
        <input
          type='file'
          name={name}
          required={required}
          accept={accept}
          className='hidden'
          onInput={onFileChange}
          multiple={multiple}
        />
      </FileBtn>
      {fileNames}
    </div>
  )
}
