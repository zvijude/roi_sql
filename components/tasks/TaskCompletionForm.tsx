import { Btn } from 'zvijude/btns'
import { Textarea } from 'zvijude/form'
import { toast } from 'zvijude/pop'
import { QrStatus } from '@prisma/client'
import { setTaskCompletion } from '@/components/tasks/api'
import Icon from 'zvijude/icon'

export default function TaskCompletionForm({ curTask, qrStatus }) {
  const { hasError, messages } = checkError(curTask, qrStatus)
  if (hasError) return <ErrorPop errorMessages={messages} />

  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')

    await setTaskCompletion(curTask, e.target.note.value)
    if (curTask.needApproval) {
      toast('success', 'המשימה הושלמה וממתינה לאישור')
    } else toast('success', 'המשימה הושלמה')

    e.target.reset()
  }

  return (
    <form popover='auto' id='completedTaskPop' className='pop' onSubmit={onSubmit}>
      <Textarea lbl='הוסף הערה על המשימה' name='note' placeholder='המשימה הושלמה...' required={false} />
      <Btn lbl='סיים משימה' className='w-full my-1' />
    </form>
  )
}

export function checkError(curTask, qrStatus) {
  const errors = [] as string[]

  if (curTask.needMedia && !curTask.media) {
    errors.push('חובה להעלות תמונה או סרטון לסיום המשימה')
  }

  if (curTask.probs?.some((prob) => prob.status === 'WAITING')) {
    errors.push('יש בעיות פתוחות שלא נפתרו')
  }

  if (qrStatus !== QrStatus.IN_PROGRESS) {
    errors.push('יש בעיה פתוחה')
  }

  return {
    hasError: errors.length > 0,
    messages: errors,
  }
}

function ErrorPop({ errorMessages }) {
  return (
    <div popover='auto' id='completedTaskPop' className='pop'>
      <div className='flex gap-2 mb-4'>
        <Icon name='triangle-exclamation' />
        <p>לא ניתן להשלים את המשימה</p>
      </div>
      <ul className='list-none pl-5 text-red-600'>
        {errorMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}
