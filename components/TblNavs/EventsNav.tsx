import Link from 'next/link'

export default async function EventsNav() {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <Link href='dash' className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>
          משימות
        </Link>
        <Link href='dash/problems' className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          חריגים ובעיות ביצוע
        </Link>
      </div>

      <div className='flex gap-0'>
        <button className='px-8 border-b-2 pb-1 border-sec text-sec font-semibold'>הכל</button>
        <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>אושרו</button>
        <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>בהמתנה</button>
        <button className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>דולגו</button>
      </div>
    </section>
  )
}
