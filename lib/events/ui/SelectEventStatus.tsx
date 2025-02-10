'use client'

import { EventType, isManager } from "@/db/types"
import { updateProbStatus } from "@/lib/prob/db/set"
import { useUser } from "@/utils/userCtx"
import { ProbStatus } from "@prisma/client"
import { Btn } from "zvijude/btns"
import { SelectObj } from "zvijude/form"
import { toast } from "zvijude/pop"

export default function SelectEventStatus({ item }) {
  const { user } = useUser() as any
  const isMng = isManager(user.role)
  function onBgt(e) {
    if (!confirm('האם אתה בטוח שברצונך לעדכן סטטוס?')) return
    toast('loading', `מעדכן סטטוס`)
    updateProbStatus(item.id, e.target.value as ProbStatus)
    toast('success', `סטטוס עודכן בהצלחה`)
  }

  function onProb() {
    if (!confirm('האם אתה בטוח שברצונך לסמן את הבעיה כפתורה?')) return
    toast('loading')
    updateProbStatus(item.id, ProbStatus.SOLVED)
    toast('success', `בעיה עודכנה בהצלחה`)
  }
  return (
    <div>
      {item.status === 'WAITING' && isMng && (
        <div>
          {item.type === "PROB" && <Btn lbl='פתור בעיה' onClick={onProb} />}
          {item.type === "BGT_REQ" && (
            <SelectObj
              placeholder='עדכן סטטוס'
              options={[
                { label: 'אישור', value: ProbStatus.GRANTED },
                { label: 'דחה', value: ProbStatus.DENIED },
              ]}
              onChange={onBgt}
            />
          )}
        </div>
      )}
    </div>
  )
}
