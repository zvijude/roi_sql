'use client'

import Icon from 'zvijude/icon'
import { Input, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'
import { rolesOptions } from '@/db/types'
import { addUser, connectExistingUser } from '@/components/user/api'
import { useState } from 'react'
import { Role } from '@/db/types'

export default function UserForm({ prjId, kablans }) {
  async function onSubmit(e) {
    toast('loading')

    const formData = getFormData(e) as any
    const res = (await addUser(prjId, formData)) as any

    if (res.fail) return toast('error', res.msg)
    toast('success', `המשתמש ${formData.firstName} ${formData.lastName} נוצר בהצלחה`)
    e.target.reset()
    setIsInstaller(false)
  }

  function onRoleChange(e) {
    setIsInstaller(e.target.value === Role.INSTALLER)
  }

  const [isInstaller, setIsInstaller] = useState(false)

  return (
    <>
      <form className='paper max-w-6xl' onSubmit={onSubmit}>
        <div className='flex items-end justify-between border-b pb-3'>
          <h2 className='flex justify-end'>
            <Icon name='user-plus' type='reg' className='size-5' />
            <span className='text-xl font-semibold'>צור משתמש חדש</span>
            <button type='button' popoverTarget='existingUserPop' className='text-sm text-blue-600 ms-2 self-end'>
              חבר משתמש קיים לפרוקיט
            </button>
          </h2>

          <Btn lbl='שמור משתמש' icon='floppy-disk' clr='solid' />
        </div>

        <div className='mt-8 grid grid-cols-5 gap-4'>
          <Input lbl='שם פרטי' name='firstName' />
          <Input lbl='שם משפחה' name='lastName' />
          <SelectObj lbl='בחר תפקיד' name='role' options={rolesOptions} onChange={onRoleChange} />
          {isInstaller && (
            <SelectObj
              lbl='בחר קבלן המשויך למתקין'
              name='kablanId'
              options={kablans}
              show='name'
              val='id'
              placeholder='בחר קבלן'
            />
          )}
          <Input lbl='טלפון נייד' name='phone' required />
          <Input lbl='מייל' name='email' />
        </div>
      </form>
      <ExistingUserPop prjId={prjId} />
    </>
  )
}

function ExistingUserPop({ prjId }) {
  return (
    <form onSubmit={(e) => connectUser(e, prjId)} popover='auto' id='existingUserPop' className='pop'>
      <Input lbl='הכנס את המייל הקיים במערכת' name='email' placeholder='example@gmail.com' />
      <Btn lbl='חבר משתמש' icon='link' className='self-center mt-2 mx-auto' />
    </form>
  )
}

async function connectUser(e, prjId) {
  toast('loading')
  const formData = getFormData(e) as any
  const res = (await connectExistingUser(prjId, formData.email)) as any
  if (res.fail) return toast('error', res.msg)
  toast('success', res.msg)

  e.target.reset()
}
