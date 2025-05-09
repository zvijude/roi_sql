'use client'
import { getNavLink } from '@/utils/getEventLink'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { Select } from 'zvijude/form'

export default function MedidotNav({ filter, medidotOpt }) {
  const router = useRouter()

  function onMissChange(e) {
    const newFilter = { ...filter }
    const selectedValue = e.target.value

    if (selectedValue) newFilter.item = selectedValue
    else delete newFilter.item

    router.push(`?filter=${JSON.stringify(newFilter)}`)
  }

  return (
    <section className='flex mt-8 justify-between items-end'>
      <div className='flex gap-0'>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>מדידות</div>
        <Link href={getNavLink({ filter, event: 'missing' })} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          חוסרים
        </Link>
      </div>
      <div className='flex gap-0'>
        <Select placeholder='פריט' options={medidotOpt} onChange={onMissChange} />
        <Btn popoverTarget='medidotForm' lbl='הוספת מידות' icon='plus' className='ms-2' />
      </div>
    </section>
  )
}

// function getMissLink(filter) {
//   if (!filter) return 'medidot/missing'

//   let newFilter = { ...filter }
//   delete newFilter.item

//   return `missing?filter=${JSON.stringify(newFilter)}`
// }
