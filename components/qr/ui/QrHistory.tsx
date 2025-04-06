import React from 'react'
import ImgsCom from '@/ui/imgsCom'
import { formatDateTime } from 'zvijude/dates/funcs'
import { formatCurrency } from 'zvijude/funcs'

export default function QrHistory({ history }) {
  const { qrData, tasks, medidot, missing, probs } = history

  const Section = ({ title, children }) => (
    <div className='rounded-2xl border shadow-sm p-5 bg-white space-y-3'>
      <h2 className='text-xl font-semibold border-b pb-2'>{title}</h2>
      {children}
    </div>
  )

  const ItemBlock = ({ children }) => <div className='border-b last:border-none py-3 space-y-1'>{children}</div>

  return (
    <div className='p-6 w-full max-w-3xl mx-auto space-y-6 text-sm text-gray-800'>
      {/* QR Info */}
      <Section title='פרטי QR'>
        <div>מספר QR: {qrData.qrNum}</div>
        <div>סטטוס: {qrData.status}</div>
        <div>מיקום: {qrData.loc}</div>
        <div>סה"כ משימות: {qrData.totalTasksCount}</div>
        <div>בוצעו: {qrData.totalTasksCompleted}</div>
      </Section>

      {/* Problems */}
      {probs?.length > 0 && (
        <Section title='אירועים'>
          {probs.map((prob, idx) => (
            <ItemBlock key={idx}>
              <div>סוג: {prob.type === 'PROB' ? 'בעיה' : 'בקשת חריגים'}</div>
              <div>סטטוס: {prob.status}</div>
              <div>תאריך: {formatDateTime(prob.createdAt)}</div>
              {prob.price > 0 && <div>מחיר: {formatCurrency(prob.price)}</div>}
              <div>תיאור: {prob.desc}</div>
              <ImgsCom urls={prob.media} />
            </ItemBlock>
          ))}
        </Section>
      )}

      {/* Measurements */}
      {medidot?.length > 0 && (
        <Section title='מדידות'>
          {medidot.map((m, idx) => (
            <ItemBlock key={idx}>
              <div>פריט: {m.item}</div>
              <div>
                מידות – רוחב: {m.width}, גובה: {m.height}, עומק: {m.depth}
              </div>
              <div>סטטוס: {m.isActive ? 'לא טופל' : 'טופל'}</div>
              <div>הערה: {m.note}</div>
              <div>תאריך: {formatDateTime(m.createdAt)}</div>
              <ImgsCom urls={m.media} />
            </ItemBlock>
          ))}
        </Section>
      )}

      {/* Missing Items */}
      {missing?.length > 0 && (
        <Section title='פריטים חסרים'>
          {missing.map((m, idx) => (
            <ItemBlock key={idx}>
              <div>פריט: {m.item}</div>
              <div>כמות: {m.qntt}</div>
              <div>הערה: {m.note}</div>
              <div>סטטוס: {m.isActive ? 'לא טופל' : 'טופל'}</div>
              <div>תאריך: {formatDateTime(m.createdAt)}</div>
              <ImgsCom urls={m.media} />
            </ItemBlock>
          ))}
        </Section>
      )}

      {/* Tasks */}
      {tasks?.length > 0 && (
        <Section title='משימות'>
          {tasks
            .filter((t) => !!t.task.status)
            .map((t, idx) => (
              <ItemBlock key={idx}>
                <div className='font-medium text-base'>{t.mainTask.title}</div>
                <div>סטטוס: {t.task.status}</div>
                <div>תיאור: {t.mainTask.desc}</div>
                <div>הערה: {t.task.note}</div>
                <div>מחיר: {formatCurrency(t.mainTask.price)}</div>
                <div>תאריך יצירה: {formatDateTime(t.task.createdAt)}</div>
                <ImgsCom urls={t.task.media} />
              </ItemBlock>
            ))}
        </Section>
      )}
    </div>
  )
}
