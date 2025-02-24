'use client'

import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Btn } from 'zvijude/btns'
import { Select, SelectObj } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'

export default function Filter({ className = '', opts }) {
  function onSubmit(e) {
    const data = getFormData(e)
    redirect(`?filter=${JSON.stringify(data)}`)
  }

  return (
    <form className={twMerge('flex items-end *:min-w-24', className)} onSubmit={onSubmit}>
      <Select
        lbl='תאריכים'
        options={['החודש הנוכחי', 'החודש הקודם', 'מתחילת השנה', 'השבוע הנוכחי', 'היום', '3 חודשים אחרונים']}
        placeholder='הכל'
        name='date'
        required={false}
      />
      <Select lbl='פרט' options={opts.parts} placeholder='הכל' name='part_name' required={false} />
      <Select lbl='קומה' options={opts.floors} placeholder='הכל' name='floor' required={false} />
      <Select lbl='דירה' options={opts.aptNums} placeholder='הכל' name='aptNum' required={false} />
      <Select lbl='מיקום בדירה' options={opts.locInApt} placeholder='הכל' name='locInApt' required={false} />
      <Select lbl='חזית' options={opts.fronts} placeholder='הכל' name='front' required={false} />
      <SelectObj lbl='קבלן' options={opts.kablans} val='id' show='name' placeholder='הכל' name='kablanId' required={false} />
      <SelectObj lbl='משתמש' options={opts.users} val='id' show='name' placeholder='הכל' name='created_by_id' required={false} />

      <Btn lbl='סינון' icon='filter' clr='text' />
    </form>
  )
}
