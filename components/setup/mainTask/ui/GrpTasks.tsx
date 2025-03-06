import { clone } from 'zvijude/funcs'
import { toast } from 'zvijude/pop'
import { Btn } from 'zvijude/btns'
import { store } from '@/utils/store'
import MainTaskTable from './MainTaskTable'
import { deleteMainTask } from '@/components/setup/mainTask/api'

export default function GrpTasks({ grpTasks, parts, setTasks }) {
  async function deleteAllTasks() {
    if (!confirm('האם אתה בטוח שברצונך למחוק את כל המשימות?')) return

    toast('loading')
    store.oldParts = store.oldParts.map((el) => el.id)
    const res = (await deleteMainTask({ tasks: store.oldTasks, partIds: store.oldParts })) as any
    toast(res?.err ? 'error' : 'success', res?.err ? 'לא ניתן למחוק משימות עם ברקוד' : 'המשימות נמחקו בהצלחה')

    scrollBy(0, 200)
  }

  return (
    <section className='max-w-6xl'>
      {grpTasks.map((grp) => {
        const grpParts = parts.filter((el) => el.tasksId === grp[0].tasksId)
        // const hasTasks = grp.some((t) => t.tasks.length > 0)
        const hasTasks = false
        return (
          <main className='mt-12' key={grp[0].tasksId}>
            <div className='flex justify-between mb-2 gap-8 items-end'>
              <div className='flex'>
                <p className='font-bold'>הפרטים לשלבי הביצוע:</p>
                {grpParts.map((part) => {
                  return (
                    <p title={part.desc} key={part.id}>
                      {part.name}
                    </p>
                  )
                })}
              </div>

              {/* TASKS Action Buttons */}
              <div className='flex'>
                {hasTasks && <span className='text-sm text-red-600'>* לא ניתן לערוך משימה שהונפק עבורה ברקוד</span>}
                <Btn
                  lbl='עריכה'
                  icon='pen-to-square'
                  className='bg-white'
                  clr='text'
                  disabled={hasTasks}
                  onClick={() => {
                    setTasks(clone(grp))
                    grpParts.forEach((el) => (el.check = true))
                    store.tmpParts = grpParts
                    store.editMode = true

                    store.oldTasks = clone(grp)
                    store.oldParts = clone(grpParts)
                    scroll(0, 70)
                  }}
                />

                <Btn
                  lbl='מחיקה'
                  icon='trash'
                  className='bg-white'
                  clr='text'
                  disabled={hasTasks}
                  onClick={() => {
                    store.oldTasks = clone(grp)
                    store.oldParts = clone(grpParts)
                    deleteAllTasks()
                  }}
                />
              </div>
            </div>

            <MainTaskTable rowsData={grp} />
          </main>
        )
      })}
    </section>
  )
}
