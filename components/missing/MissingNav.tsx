import Link from 'next/link'

export default async function MissingNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <Link href='./' className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          מדידות
        </Link>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>חוסרים</div>
      </div>
    </section>
  )
}
