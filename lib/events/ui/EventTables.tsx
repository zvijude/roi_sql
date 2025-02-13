'use client'

import ProbTable from '@/lib/prob/ui/ProbTable'
import TaskTable from '@/lib/task/ui/TaskTable'

export default function EventTables({ tasks, probs }) {
  return (
    <div className='grid gap-8'>
      <div>
        <TaskTable data={tasks} key={Math.random()} />
      </div>
      <div>
        <h2 className='text-2xl font-semibold'>בקשות חריגות</h2>
        <ProbTable data={probs} key={Math.random()} />
      </div>
    </div>
  )
}
