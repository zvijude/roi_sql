'use client'

import { toast } from 'zvijude/pop'
import SimpleTable from 'zvijude/table/SimpleTable'
import EditForm from './EditForm'
import { useState } from 'react'
import { deleteUser } from '@/lib/user/db/set'
import { Btn } from 'zvijude/btns'
import { roleDic } from '@/db/types'
import { useParams } from 'next/navigation'
import { Role } from '@prisma/client'

export default function UsersTable({ users, kablans }) {
  const prjId = Number(useParams().prjId)

  async function onDelete(user) {
    if (!confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${user.name}?`)) return

    toast('loading')
    await deleteUser(user.id, user.role, prjId)
    toast('success', `המשתמש ${user.name} נמחק בהצלחה`)
  }

  const [editUser, setEditUser] = useState({})

  return (
    <>
      <SimpleTable headers={['שם מלא', 'תפקיד', 'טלפון', 'מייל', 'עריכה / מחיקה']}>
        <tbody>
          {users.map((u, i) => {
            return (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{roleDic[u.role]}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>
                  <div className=' flex'>
                    <Btn
                      clr='icon'
                      icon='pen'
                      type='button'
                      disabled={u.role === Role.ADMIN}
                      onClick={() => setEditUser({ ...u })}
                      popoverTarget='editUserForm'
                    />
                    <Btn
                      clr='icon'
                      icon='trash'
                      type='button'
                      onClick={() => onDelete(u)}
                      disabled={u.role === Role.ADMIN}
                      popoverTarget='editUserForm'
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </SimpleTable>

      <EditForm user={editUser} key={Math.random()} kablans={kablans} />
    </>
  )
}
