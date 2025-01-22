import { Btn } from 'zvijude/btns'
import { Textarea } from 'zvijude/form'
import { toast } from 'zvijude/pop'
import { setTaskCompletion } from '@/lib/task/completedTask/db/set'
import Icon from 'zvijude/icon'

export default function TaskCompletionForm({ curTask, openProbs }) {
  async function onSubmit(e) {
    e.preventDefault()
    toast('loading')

    await setTaskCompletion(curTask, e.target.note.value)
    if (curTask.price) {
      toast('success', 'המשימה הושלמה וממתינה לאישור')
    } else toast('success', 'המשימה הושלמה')

    e.target.reset()
  }

  if (openProbs) return <ErrorPop />

  return (
    <form popover="auto" id="completedTaskPop" className="pop" onSubmit={onSubmit}>
      <Textarea
        lbl="הוסף הערה על המשימה"
        name="note"
        placeholder="המשימה הושלמה..."
        required={false}
      />
      <Btn lbl="סיים משימה" className="w-full my-1" />
    </form>
  )
}

function ErrorPop() {
  return (
    <div popover="auto" id="completedTaskPop" className="pop">
      <div className="flex gap-2 mb-4">
        <Icon name="triangle-exclamation" />
        <p>לא ניתן להשלים את המשימה כאשר:</p>
      </div>
      <p>1. חובה תמונה ואינה</p>
      <p>2. בעיות פתוחות</p>
      <p>3. בקשות תקציב פתוחות</p>
    </div>
  )
}
