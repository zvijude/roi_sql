'use client'

import { updateProbStatus } from '@/components/events/api'
import { groupBy } from '@/utils/func'
import { ProbStatus } from '@prisma/client'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'

export default function CurTaskEvents({ events }) {
  const { PROB: probs = [], BGT_REQ: bgtReqs = [] } = groupBy(events, ({ type }) => type)

  async function onProb(prob) {
    toast('loading')
    await updateProbStatus(prob.id, ProbStatus.CANCELED)
    toast('success', 'הבעיה בוטלה בהצלחה')
  }

  async function onBgt(bgtReq) {
    toast('loading')
    await updateProbStatus(bgtReq.id, ProbStatus.CANCELED)
    toast('success', 'הבקשה בוטלה בהצלחה')
  }

  const { WAITING: p_waiting, SOLVED: p_solved, CANCELED: p_canceled } = groupBy(probs, ({ status }) => status)
  const {
    WAITING: b_waiting,
    GRANTED: b_granted,
    DENIED: b_denied,
    CANCELED: b_canceled,
  } = groupBy(bgtReqs, ({ status }) => status)

  return (
    <div className='max-w-[420px] w-full justify-self-center space-y-5 mb-3'>
      <Section title='בעיות לא פתורות' items={p_waiting} onClick={(p) => onProb(p)} />
      <Section title='בעיות שבוטלו' items={p_canceled} />
      <Section title='בעיות פתורות' items={p_solved} />

      <Section title='בקשות תקציב ממתינות' items={b_waiting} onClick={(b) => onBgt(b)} />
      <Section title='בקשות תקציב שנדחו' items={b_denied} />
      <Section title='בקשות תקציב שאושרו' items={b_granted} />
      <Section title='בקשות תקציב שבוטלו' items={b_canceled} />
    </div>
  )
}

function Section({ title, items, onClick }: { title: string; items: any[]; onClick?: any }) {
  if (!items?.length) return null

  return (
    <div className='bg-white p-2 rounded-lg shadow'>
      <h2 className='text-center mb-3 text-lg font-semibold'>{title}</h2>
      {items.map((item, index) => (
        <div key={index} className='mb-2 flex justify-between'>
          <p className='max-w-[90%]'>{item.desc}</p>
          {onClick && <Btn clr='text' size='small' lbl='בטל' onClick={() => onClick(item)} />}
        </div>
      ))}
    </div>
  )
}
