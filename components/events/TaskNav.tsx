import { getNavLink } from '@/utils/getEventLink'
import Link from 'next/link'

export default async function TaskNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>משימות</div>
        <Link href={getNavLink({ filter, event: 'problems' })} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          בעיות ביצוע
        </Link>
        <Link
          href={getNavLink({ filter, event: 'budget_requests' })}
          className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'
        >
          בקשות חריגים
        </Link>
      </div>

      <div className='flex gap-0'>
        <NavLink lbl='הכל' active={!filter?.status} filter={filter} />
        <NavLink status='COMPLETED' lbl='אושרו' active={filter?.status === 'COMPLETED'} filter={filter} />
        <NavLink status='WAITING' lbl='בהמתנה' active={filter?.status === 'WAITING'} filter={filter} />
        <NavLink status='SKIPPED' lbl='דולגו' active={filter?.status === 'SKIPPED'} filter={filter} />
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
