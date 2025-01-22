'use client'

import Icon from 'zvijude/icon'
import { Input, SelectObj } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'
import { editUser } from '@/lib/user/db/set'
import { rolesOptions } from '@/db/types'
import { Role } from '@prisma/client'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function EditForm({ user, kablans }) {
  const prjId = Number(useParams().prjId)
  async function onUpdate(e) {
    const data = getFormData(e) as any
    data.id = user.id
    toast('loading')
    const res = (await editUser(data, user, prjId)) as any
    if (res.failed) return toast('error', res.msg)
    toast('success', `המשתמש ${data.firstName} ${data.lastName} עודכן בהצלחה`)
  }

  const [isInstaller, setIsInstaller] = useState(user.role === Role.INSTALLER)
  function onRoleChange(e) {
    setIsInstaller(e.target.value === Role.INSTALLER)
  }

  return (
    <form className='max-w-6xl pop' onSubmit={onUpdate} popover='auto' id='editUserForm'>
      <div className='flex items-end justify-between border-b pb-3'>
        <h2 className='flex justify-end'>
          <Icon name='user-pen' type='reg' className='size-5' />
          <span className='text-xl font-semibold'>עדכון משתמש</span>
        </h2>
        <Btn lbl='שמור עדכון' icon='floppy-disk-pen' clr='solid' />
      </div>
      <div className='mt-8 grid grid-cols-2 gap-4'>
        <Input lbl='שם פרטי' name='firstName' defaultValue={user.firstName} />
        <Input lbl='שם משפחה' name='lastName' defaultValue={user.lastName} />

        <SelectObj
          lbl='בחר תפקיד'
          name='role'
          options={rolesOptions}
          onChange={onRoleChange}
          defaultValue={user.role}
        />
        {isInstaller && (
          <SelectObj
            lbl='בחר קבלן המשויך למתקין'
            name='kablanId'
            options={kablans}
            show='name'
            val='id'
            defaultValue={user.kablanId}
          />
        )}

        {/* <Input lbl="מייל" name="email" defaultValue={user.email} /> */}
        <Input lbl='טלפון נייד' name='phone' defaultValue={user.phone} />
      </div>
    </form>
  )
}
