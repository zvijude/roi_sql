import { BgtReqStatus, ProbStatus, TaskStatus } from '@prisma/client'
import EventSection from './EventSection'
import EventsStats from './EventsStats'

export default function Events({ data }) {
  const dataByEvent = {
    prob_w: data.probs?.filter((p) => p.status === ProbStatus.WAITING),
    prob_c: data.probs?.filter((p) => p.status === ProbStatus.CANCELED),
    prob_s: data.probs?.filter((p) => p.status === ProbStatus.SOLVED),
    bgtReq_w: data.bgtReq?.filter((b) => b.status === BgtReqStatus.WAITING),
    bgtReq_g: data.bgtReq?.filter((b) => b.status === BgtReqStatus.GRANTED),
    bgtReq_d: data.bgtReq?.filter((b) => b.status === BgtReqStatus.DENIED),
    bgtReq_c: data.bgtReq?.filter((b) => b.status === BgtReqStatus.CANCELED),
    task_w: data.tasks?.filter((t) => t.status === TaskStatus.WAITING),
    task_c: data.tasks?.filter((t) => t.status === TaskStatus.COMPLETED),
    task_s: data.tasks?.filter((t) => t.status === TaskStatus.SKIPPED),
  }

  return (
    <>
      <EventsStats dataByEvent={dataByEvent} />
      <div className='grid'>
        <EventSection
          header='משימות הממתינות לאישור'
          data={dataByEvent.task_w}
          id='tasks-waiting'
        />
        <EventSection header='בקשות תקציב פתוחות' data={dataByEvent.bgtReq_w} id='bgtReq-waiting' />
        <EventSection header='בעיות פתוחות' data={dataByEvent.prob_w} id='probs-unsolved' />
        <EventSection header='משימות שהושלמו' data={dataByEvent.task_c} id='tasks-approved' />
        <EventSection header='משימות שדולגו' data={dataByEvent.task_s} id='tasks-skipped' />
        {/* <EventSection header='בעיות סגורות' data={dataByEvent.prob_s} id='probs-solved' /> */}
        <EventSection header='בקשות תקציב שאושרו' data={dataByEvent.bgtReq_g} id='bgtReq-granted' />
        <EventSection header='בקשות תקציב שנדחו' data={dataByEvent.bgtReq_d} id='bgtReq-denied' />
        <EventSection header='בעיות שבוטלו' data={dataByEvent.prob_c} id='probs-canceled' />
        <EventSection header='בקשות תקציב שבוטלו' data={dataByEvent.bgtReq_c} id='bgtReq-canceled' />
      </div>
    </>
  )
}
