import Link from 'next/link'

export default async function MedidotNav({ filter }) {
  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>מדידות</div>
        <Link href='medidot/missing' className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          חוסרים
        </Link>
      </div>
    </section>
  )
}
