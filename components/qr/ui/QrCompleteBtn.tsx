'use client'

import { isManager, roleLevels } from '@/db/types'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import { QrStatus, TaskStatus } from '@prisma/client'
import { approveTask } from '@/components/tasks/api'

export default function QrCompleteBtn({ curTask, userRole, qrStatus }) {
  const isAuthorized = roleLevels[userRole] >= roleLevels[curTask.for]

  async function onApproval() {
    toast('loading')
    await approveTask({ curTask })
    toast('success', 'המשימה אושרה בהצלחה')
  }

  const isNotInProgress = curTask.status === TaskStatus.WAITING || qrStatus !== QrStatus.IN_PROGRESS

  return (
    <>
      {curTask.status === QrStatus.WAITING_TASK && (
        <div className='w-full'>
          <p className='text-center font-semibold'>המשימה ממתינה לאישור מנהל</p>
          <Btn
            icon='hourglass'
            lbl='אישור מנהל'
            className='w-full'
            clr='text'
            disabled={!isManager(userRole)}
            onClick={onApproval}
          />
        </div>
      )}
      <div className='grid w-full gap-2.5'>
        <Btn lbl='השלם משימה' disabled={!isAuthorized || isNotInProgress} popoverTarget='completedTaskPop' icon='shield-check' />
      </div>
    </>
  )
}
