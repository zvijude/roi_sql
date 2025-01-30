'use client'

import { addSkippedTask } from '@/lib/task/skippedTask/db/set'
import { isManager, roleLevels } from '@/db/types'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'
import UploadMedia from '@/ui/UploadMedia'
import { QrStatus, TaskStatus } from '@prisma/client'
import { addMedia, approveTask } from '@/lib/task/db/set'

export default function QrForm({ curTask, userRole, qrStatus }) {
  const isAuthorized = roleLevels[userRole] >= roleLevels[curTask.for]

  async function onSkipped() {
    if (!confirm('האם אתה בטוח שברצונך לדלג על המשימה?')) return
    toast('loading')
    await addSkippedTask(curTask)
    toast('success', 'המשימה דולגה בהצלחה')
  }

  async function onApproval() {
    toast('loading')
    await approveTask({ curTask })
    toast('success', 'המשימה אושרה בהצלחה')
  }

  async function onUpload(urls) {
    const res = (await addMedia(curTask.id, urls)) as any
    if (res.failed) return toast('error', res.err)
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
        <Btn
          lbl='השלם משימה'
          disabled={!isAuthorized || isNotInProgress}
          popoverTarget='completedTaskPop'
          icon='shield-check'
        />
        <UploadMedia onUpload={onUpload} />
        <Btn
          lbl='העלאת בעיה'
          disabled={isNotInProgress}
          popoverTarget='problemForm'
          icon='triangle-exclamation'
          clr='text'
          size='small'
          className='text-xs w-full shadow-none'
        />
        <Btn
          lbl='בקשת חריגים'
          disabled={isNotInProgress}
          popoverTarget='bgtReqForm'
          icon='hand-holding-dollar'
          clr='text'
          size='small'
          flipIcon
          className='text-xs  w-full shadow-none'
        />
        <Btn
          lbl='דלג על המשימה'
          disabled={!isManager(userRole) || isNotInProgress}
          onClick={onSkipped}
          icon='arrow-rotate-left'
          clr='text'
          size='small'
          className='text-xs w-full shadow-none'
        />
      </div>
    </>
  )
}
