'use client'

import { Input } from 'zvijude/form'
import Icon from 'zvijude/icon'
import { Btn } from 'zvijude/btns'
import { addProject } from '@/db/project/set'
import { getFormData } from 'zvijude/form/funcs'
import { toast } from 'zvijude/pop'

export default function NewProject() {
  async function onSubmit(e) {
    const data = getFormData(e)

    toast('loading')
    await addProject(data)
    toast('success', 'פרויקט נוצר בהצלחה')

    document.getElementById('newProjectPop')?.hidePopover()
    e.target.reset()
  }

  return (
    <div className="pop" popover="auto" id="newProjectPop">
      <div className="mb-6 flex gap-2 border-b pb-2">
        <Icon name="city" className="size-5" />
        <h2 className="text-lg font-light">פרויקט חדש</h2>
      </div>

      <form className="grid gap-6" onSubmit={onSubmit}>
        <Input lbl="שם הפרויקט" name="name" />
        <Btn
          lbl="צור פרויקט"
          icon="floppy-disk"
          clr="solid"
          popoverTarget="newProjectPop"
          popoverTargetAction="hide"
        />
      </form>
    </div>
  )
}
