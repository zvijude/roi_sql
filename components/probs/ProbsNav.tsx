import Link from 'next/link'

export default async function ProbNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <Link href='./' className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          משימות
        </Link>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>חריגים ובעיות ביצוע</div>
      </div>

      <div className='flex gap-0'>
        <NavLink href='?' lbl='הכל' active={!filter.status} />

        <NavLink href={`?filter=${JSON.stringify({ status: 'WAITING' })}`} lbl='בהמתנה' active={filter.status == 'WAITING'} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'GRANTED' })}`} lbl='אושרו' active={filter.status == 'GRANTED'} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'SOLVED' })}`} lbl='נפתרו' active={filter.status == 'SOLVED'} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'DENIED' })}`} lbl='נדחו' active={filter.status == 'DENIED'} />
        <NavLink href={`?filter=${JSON.stringify({ status: 'CANCELED' })}`} lbl='בוטלו' active={filter.status == 'CANCELED'} />
      </div>
    </section>
  )
}
// type: "BGT_REQ"

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
