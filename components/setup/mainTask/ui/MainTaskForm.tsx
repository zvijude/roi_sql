import { Textarea, Input, Switch, SelectObj } from 'zvijude/form'

export default function MainTaskForm({ task }) {
  const taskForOpt = [
    { value: "INSTALLER", label: 'קבלן' },
    { value: "SITE_MNGR", label: 'מנהל ביצוע' },
    { value: "PRJ_MNGR", label: 'מנהל פרויקט' },
    { value: "C_INSTALLER", label: 'מתקין ע.חברה' },
    { value: "ADMIN", label: 'אדמין' },
  ]

  return (
    <form
      id="taskForm"
      name="taskForm"
      className="grid grid-cols-4 gap-x-6 gap-y-2 items-start mt-4">
      <input type="text" name="id" defaultValue={task.id} className="hidden" readOnly />

      <SelectObj lbl="מיועדת ל:" name="for" defaultValue={task.for} options={taskForOpt} />
      <Input
        lbl="כותרת למשימה"
        name="title"
        defaultValue={task.title}
        placeholder="כותרת המשימה לביצוע"
      />
      <Input
        type="number"
        min={1}
        lbl="תמחור המשימה"
        name="price"
        defaultValue={task.price || ''}
        required={false}
        placeholder="מחיר עבור ביצוע המשימה"
      />
      <div className="col-span-2 row-span-2">
        <Textarea
          lbl="פירוט המשימה"
          name="desc"
          defaultValue={task.desc}
          placeholder="פרטי המשימה לביצוע"
          className="min-h-[100px]"
        />
      </div>
      <div className='col-span-2 border p-2 rounded-md '>
        <Switch
          lbl='המשימה דורשת אישור מנהל בסיום העבודה'
          name='needApproval'
          defaultChecked={task.needApproval}
        />
      </div>
      <div className="col-span-2 border p-2 rounded-md ">
        <Switch
          lbl="חובה להעלות תמונה או סרטון בסיום המשימה"
          name="needMedia"
          defaultChecked={task.needMedia}
        />
      </div>
    </form>
  )
}
