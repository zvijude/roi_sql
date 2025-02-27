'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Select } from 'zvijude/form'

export default function MedidotNav({ filter, midotOpt }) {
  const router = useRouter()

  function onMissChange(e) {
    const newFilter = { ...filter }
    const selectedValue = e.target.value

    if (selectedValue) newFilter.item = selectedValue
    else delete newFilter.item

    router.push(`?filter=${JSON.stringify(newFilter)}`)
  }

  return (
    <section className='flex mt-8 justify-between'>
      <div className='flex gap-0'>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>מדידות</div>
        <Link href={getMissLink(filter)} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          חוסרים
        </Link>
      </div>
      <div className='flex gap-0'>
        <Select placeholder='פריט' options={midotOpt} onChange={onMissChange} />
      </div>
    </section>
  )
}

function getMissLink(filter) {
  if (!filter) return 'medidot/missing'

  let newFilter = { ...filter }
  delete newFilter.item

  return `medidot/missing?filter=${JSON.stringify(newFilter)}`
}
