import { getEventLink } from '@/utils/getEventLink';
import Link from 'next/link'

export default async function BgtReqNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <Link href={getEventLink({ filter, event: 'tasks' })} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          משימות
        </Link>
        <Link href={getEventLink({ filter, event: 'problems' })} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          בעיות ביצוע
        </Link>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>בקשות חריגים</div>
      </div>

      <div className='flex gap-0'>
        <NavLink lbl='הכל' active={!filter?.status} filter={filter} />
        <NavLink status='WAITING' lbl='בהמתנה' active={filter?.status === 'WAITING'} filter={filter} />
        <NavLink status='GRANTED' lbl='אושרו' active={filter?.status === 'GRANTED'} filter={filter} />
        <NavLink status='DENIED' lbl='נדחו' active={filter?.status === 'DENIED'} filter={filter} />
        <NavLink status='CANCELED' lbl='בוטלו' active={filter?.status === 'CANCELED'} filter={filter} />
      </div>
    </section>
  )
}

function NavLink({ status, lbl, active, filter }: { status?: string; lbl: string; active?: boolean; filter: any }) {
  const newFilter = { ...filter }
  if (!status) delete newFilter.status
  else newFilter.status = status

  return (
    <Link
      href={`?filter=${JSON.stringify(newFilter)}`}
      className={`px-8 border-b-2 pb-1 ${active ? 'border-sec text-sec font-semibold' : 'text-slate-600 border-slate-300'}`}
    >
      {lbl}
    </Link>
  )
}
