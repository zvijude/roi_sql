import { getNavLink } from '@/utils/getEventLink'
import Link from 'next/link'

export default async function ProbNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between gap-8'>
      <div className='flex gap-0 mobile:grid mobile:grid-cols-3 items-end'>
        <Link href={getNavLink({ filter, event: 'tasks' })} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          משימות
        </Link>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'> בעיות ביצוע</div>
        <Link
          href={getNavLink({ filter, event: 'budget_requests' })}
          className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'
        >
          בקשות חריגים
        </Link>
      </div>

      <div className='flex gap-0 mobile:grid mobile:grid-cols-4 items-end'>
        <NavLink lbl='הכל' active={!filter?.status} filter={filter} />
        <NavLink status='WAITING' lbl='בהמתנה' active={filter?.status === 'WAITING'} filter={filter} />
        <NavLink status='SOLVED' lbl='נפתרו' active={filter?.status === 'SOLVED'} filter={filter} />
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
