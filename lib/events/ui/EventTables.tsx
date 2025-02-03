'use client'

import ProbTable from '@/lib/prob/ui/ProbTable'
import TaskTable from '@/lib/task/ui/TaskTable'

export default function EventTables({ tasks, probs }) {
  return (
    <div className='grid w-fit space-y-14 mx-auto'>
      <div>
        <h2 className='text-2xl font-semibold'>משימות</h2>
        <TaskTable data={tasks} />
      </div>
      <div>
        <h2 className='text-2xl font-semibold'>בקשות חריגות</h2>
        <ProbTable data={probs} />
      </div>
    </div>
  )
}
