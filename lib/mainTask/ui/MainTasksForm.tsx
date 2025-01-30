import Icon from 'zvijude/icon'
import { genId } from 'zvijude/funcs'
import { toast } from 'zvijude/pop'
import { Btn } from 'zvijude/btns'
import { store, useSnap } from '@/utils/store'
import { crtMainTask, updateMainTask } from '@/lib/mainTask/db/set'
import MainTaskForm from '@/lib/mainTask/ui/MainTaskForm'

export default function MainTasksForm({ tasks, prjId, initialTask, setTasks }) {
  const { editMode, oldTasks } = useSnap()
  let tmpIndex: number

  function swap(i, num) {
    let spredArr = [...tasks]
    const tmp = spredArr[i + num]
    spredArr[i + num] = tasks[i]
    spredArr[i] = tmp
    setTasks(spredArr)
  }

  function deleteTask() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את המשימה?')) return

    const spredArr = [...tasks]
    spredArr.splice(tmpIndex, 1)

    setTasks(spredArr)
  }

  function onNextTask(e) {
    e.preventDefault()
    const form = document.forms[document.forms.length - 1]
    if (!form.checkValidity()) return form.reportValidity()
    setTasks((tasks) => [...tasks, { ...initialTask, id: genId() }])
  }

  async function onSave(e) {
    e.preventDefault()

    const partIds = getPartIds()
    if (!partIds.length) return toast('error', 'לא נבחרו פריטים')

    const newTasks = getFormTasks()
    if (!newTasks) return

    toast('loading')

    await crtMainTask({ tasks: newTasks, partIds, prjId })
    refresh()
    toast('success')
  }

  // refresh on change
  function refresh() {
    setTasks([initialTask])
    store.editMode = false
    store.tmpParts = []
  }

  function getPartIds() {
    const partsForm = document.querySelector("form[name='partsForm']") as HTMLFormElement
    const prts = new FormData(partsForm)
    const partIds = Object.fromEntries(prts)
    return Object.keys(partIds).map(Number)
  }

  function getFormTasks() {
    const newTasks = [] as any[]
    const taskForms = document.querySelectorAll("form[name='taskForm']") as unknown as HTMLFormElement[]
    for (const form of taskForms) {
      if (!form.checkValidity()) return form.reportValidity()
      const data = new FormData(form)
      newTasks.push(Object.fromEntries(data))
    }
    return newTasks
  }

  async function updateTask(e) {
    e.preventDefault()

    const partIds = getPartIds()
    if (!partIds.length) return toast('error', 'לא נבחרו פריטים')

    const newTasks = getFormTasks()
    if (!newTasks) return

    toast('loading')
    const res = await updateMainTask({
      tasks: newTasks,
      oldTasks,
      partIds,
      oldPartsIds: store.oldParts?.map((el) => el.id),
      prjId,
    }) as any

    // refresh()
    toast(res?.err ? 'error' : 'success', res?.msg)
    scrollBy(0, 200)
  }

  return (
    <div className='mt-8'>
      {tasks.map((task, i) => {
        return (
          <div key={task.id}>
            <div className='bg-slate-50 flex justify-between mt-8 mb-4 px-2'>
              <div className='flex gap-8'>
                <h2 className='font-bold text-l'>משימה מס' {i + 1}</h2>
              </div>

              {/* TASK Action Buttons */}
              <div className='flex'>
                <button type='button' title='הרם משימה למעלה' onClick={() => swap(i, -1)} disabled={i === 0}>
                  <Icon name='arrow-up' className='size-4' />
                </button>
                <button
                  type='button'
                  title='הורד משימה למטה'
                  onClick={() => swap(i, 1)}
                  disabled={tasks.length === i + 1}>
                  <Icon name='arrow-down' className='size-4' />
                </button>
                <button
                  type='button'
                  title='מחק משימה'
                  disabled={tasks.length === 1}
                  onClick={() => {
                    tmpIndex = i
                    deleteTask()
                  }}>
                  <Icon name='trash' className='size-4' />
                </button>
              </div>
            </div>

            <MainTaskForm task={task} />
          </div>
        )
      })}

      <div className='flex justify-between mt-2'>
        <Btn lbl={`משימה מס' ${tasks.length + 1}`} icon='plus' onClick={onNextTask} clr='soft' className='self-start' />

        {!editMode && (
          <div>
            <p className='text-sm text-gray-600 mb-1 mt-4'>זהו שלב הביצוע האחרון לפרטים אלו?</p>

            <Btn lbl='שמור את כל המשימות' icon='floppy-disk' onClick={onSave} />
          </div>
        )}
        {editMode && (
          <div className='flex items-end mt-4'>
            <Btn
              lbl='בטל עריכה'
              icon='xmark'
              clr='text'
              onClick={() => {
                setTasks([initialTask])
                store.editMode = false
                store.tmpParts = []
                scroll(0, 70)
              }}
            />
            <Btn lbl='שמור עריכה' icon='floppy-disk-pen' onClick={updateTask} />
          </div>
        )}
      </div>
    </div>
  )
}
