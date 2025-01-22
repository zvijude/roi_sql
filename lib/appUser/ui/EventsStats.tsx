'use client'

import StatsUi from '@/ui/StatsUi'

export default function EventsStats({ dataByEvent }) {
  function scrollTo(id) {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const { prob_w, prob_c, prob_s, bgtReq_w, bgtReq_g, bgtReq_d, bgtReq_c, task_w, task_c, task_s } =
    dataByEvent

  return (
    <div>
      <div className='flex'>
        {task_w?.length > 0 && (
          <StatsUi
            lbl='משימות הממתינות לאישור'
            stat={task_w?.length}
            onClick={() => scrollTo('tasks-waiting')}
          />
        )}
        {prob_w?.length > 0 && (
          <StatsUi
            lbl='בעיות פתוחות'
            stat={prob_w?.length}
            onClick={() => scrollTo('probs-unsolved')}
          />
        )}
        {bgtReq_w?.length > 0 && (
          <StatsUi
            lbl='בקשות תקציב פתוחות'
            stat={bgtReq_w?.length}
            onClick={() => scrollTo('bgtReq-waiting')}
          />
        )}

        {task_c?.length > 0 && (
          <StatsUi
            lbl='משימות שהושלמו'
            stat={task_c?.length}
            onClick={() => scrollTo('tasks-approved')}
          />
        )}
        {task_s?.length > 0 && (
          <StatsUi
            lbl='משימות שדולגו'
            stat={task_s?.length}
            onClick={() => scrollTo('tasks-skipped')}
          />
        )}
        {prob_s?.length > 0 && (
          <StatsUi
            lbl='בעיות סגורות'
            stat={prob_s?.length}
            onClick={() => scrollTo('probs-solved')}
          />
        )}
        {prob_c?.length > 0 && (
          <StatsUi
            lbl='בעיות שבוטלו'
            stat={prob_c?.length}
            onClick={() => scrollTo('probs-canceled')}
          />
        )}
        {bgtReq_g?.length > 0 && (
          <StatsUi
            lbl='בקשות תקציב שאושרו'
            stat={bgtReq_g?.length}
            onClick={() => scrollTo('bgtReq-granted')}
          />
        )}
        {bgtReq_d?.length > 0 && (
          <StatsUi
            lbl='בקשות תקציב שנדחו'
            stat={bgtReq_d?.length}
            onClick={() => scrollTo('bgtReq-denied')}
          />
        )}
        {bgtReq_c?.length > 0 && (
          <StatsUi
            lbl='בקשות תקציב שבוטלו'
            stat={bgtReq_c?.length}
            onClick={() => scrollTo('bgtReq-canceled')}
          />
        )}
      </div>
    </div>
  )
}
