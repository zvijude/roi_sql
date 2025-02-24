import Link from 'next/link'

export default async function TaskNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>משימות</div>
        <Link href='dash/problems' className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          חריגים ובעיות ביצוע
        </Link>
      </div>

      <div className='flex gap-0'>
        <NavLink href='?' lbl='הכל' active={!filter.status} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'COMPLETED' })}`} lbl='אושרו' active={filter.status == 'COMPLETED'} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'WAITING' })}`} lbl='בהמתנה' active={filter.status == 'WAITING'} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'SKIPPED' })}`} lbl='דולגו' active={filter.status == 'SKIPPED'} />
      </div>
    </section>
  )
}

function NavLink({ href, lbl, active }: { href: string; lbl: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-8 border-b-2 pb-1 ${active ? 'border-sec text-sec font-semibold' : 'text-slate-600 border-slate-300'}`}
    >
      {lbl}
    </Link>
  )
}
