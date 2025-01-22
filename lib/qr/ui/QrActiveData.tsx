'use client'

import { updateBgtReqStatus } from '@/lib/bgtReq/db/set'
import { cancelProb } from '@/lib/prob/db/set'
import { BgtReqStatus } from '@prisma/client'
import { Btn } from 'zvijude/btns'
import { toast } from 'zvijude/pop'

export default function QrActiveData({ probs, bgtReqs }) {
  async function onProb(prob) {
    toast('loading')
    await cancelProb(prob.id)
    toast('success', 'הבעיה בוטלה בהצלחה')
  }

  async function onBgt(bgtReq) {
    toast('loading')
    await updateBgtReqStatus(bgtReq.id, BgtReqStatus.CANCELED)
    toast('success', 'הבקשה בוטלה בהצלחה')
  }

  return (
    <div className='max-w-[420px] w-full justify-self-center space-y-5'>
      <Section title='בעיות לא פתורות' items={probs.waiting} onClick={(p) => onProb(p)} />
      <Section title='בקשות בהמתנה' items={bgtReqs.waiting} onClick={(b) => onBgt(b)} />
      <Section title='בעיות פתורות' items={probs.solved} />
      <Section title='בקשות שלא אושרו' items={bgtReqs.denied} />
      <Section title='בקשות שאושרו' items={bgtReqs.granted} />
      <Section title='בעיות שבוטלו' items={probs.canceled} />
      <Section title='בקשות שבוטלו' items={bgtReqs.canceled} />
    </div>
  )
}

function Section({ title, items, onClick }: { title: string; items: any[]; onClick?: any }) {
  if (!items?.length) return null

  return (
    <div className='bg-white p-2 rounded-lg shadow'>
      <h2 className='text-center mb-3 text-lg font-semibold'>{title}</h2>
      {items.map((item) => (
        <div className='mb-2 flex justify-between'>
          <p className='max-w-[90%]'>{item.desc}</p>
          {onClick && <Btn clr='text' size='small' lbl='בטל' onClick={() => onClick(item)} />}
        </div>
      ))}
    </div>
  )
}
