'use client'

import { Select } from 'zvijude/form'
import AptOpt from './AptOpt'
import { Btn } from 'zvijude/btns'

export function SelectAptOpt({ aptOpt, noEdit = false, defaultValue = '' }) {
  return (
    <div>
      <Select
        lbl=' מיקום בדירה'
        name='locInApt'
        options={aptOpt}
        className='w-full'
        defaultValue={defaultValue}
      />
      {!noEdit && (
        <Btn
          lbl='ערוך מיקום'
          clr='text'
          popoverTarget='aptOptPop'
          type='button'
          className='mt-1 shadow-none size-7'
        />
      )}

      <AptOpt aptOpt={aptOpt} />
    </div>
  )
}
