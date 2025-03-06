'use client'

import Icon from 'zvijude/icon'
import { genId } from '@/utils/func'
import { useState } from 'react'
import MainTasksForm from './MainTasksForm'
import GrpTasks from './GrpTasks'
import PartsForm from '@/components/setup/part/ui/PartsForm'

export default function MainTask({ grpTasks, prtsNoGrp, parts, prjId }) {
  const initialTask = {
    title: '',
    desc: '',
    price: 0,
    pic: false,
    vid: false,
    mngr: false,
    id: genId(),
  }
  const [tasks, setTasks] = useState([initialTask])

  return (
    <main className="">
      <section className="paper max-w-5xl">
        <h2 className="flex border-b pb-2">
          <Icon name="screwdriver-wrench" type="reg" className="size-5" />
          <span className="text-xl font-semibold">צור שלבי ביצוע להתקנה</span>
        </h2>

        <PartsForm prtsNoGrp={prtsNoGrp} />
        <MainTasksForm prjId={prjId} setTasks={setTasks} tasks={tasks} initialTask={initialTask} />
      </section>

      <GrpTasks grpTasks={grpTasks} parts={parts} setTasks={setTasks} />
    </main>
  )
}
