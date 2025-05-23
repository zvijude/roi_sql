'use client'
import { getNavLink } from '@/utils/getEventLink'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { Select } from 'zvijude/form'

export default function MissingNav({ filter, itemOpt }) {
  const router = useRouter()

  function onChangeItem(e) {
    const newFilter = { ...filter }
    const selectedValue = e.target.value

    if (selectedValue) newFilter.item = selectedValue
    else delete newFilter.item

    router.push(`?filter=${JSON.stringify(newFilter)}`)
  }

  return (
    <section className='flex mt-8 justify-between items-end'>
      <div className='flex gap-0'>
        <Link href={getNavLink({ filter, event: 'medidot' })} className='px-8 border-b-2 pb-1 text-slate-600 border-slate-300'>
          מדידות
        </Link>
        <div className='px-8 border-b-2 pb-1 border-solid text-solid font-semibold'>חוסרים</div>
      </div>
      <div className='flex gap-0 items-end'>
        <NavLink lbl='הכל' active={!filter?.hasOwnProperty('isActive')} filter={filter} />
        <NavLink isActive={false} lbl='טופל' active={filter?.isActive === false} filter={filter} />
        <NavLink isActive={true} lbl='לא טופל' active={filter?.isActive === true} filter={filter} />

        <Select placeholder='פריט' options={itemOpt} onChange={onChangeItem} className='' />
        <Btn popoverTarget='missForm' lbl='הוספת חוסרים' icon='plus' className='ms-2' />
      </div>
    </section>
  )
}

function NavLink({ isActive, lbl, active, filter }: { isActive?: boolean; lbl: string; active?: boolean; filter: any }) {
  const newFilter = { ...filter }

  if (isActive === undefined) {
    delete newFilter.isActive
    delete newFilter.item
  } else newFilter.isActive = isActive

  return (
    <Link
      href={`?filter=${JSON.stringify(newFilter)}`}
      className={`px-8 border-b-2 pb-1 ${active ? 'border-sec text-sec font-semibold' : 'text-slate-600 border-slate-300'}`}
    >
      {lbl}
    </Link>
  )
}

// function getMedidotLink(filter) {
//   if (!filter) return './'

//   let newFilter = { ...filter }
//   delete newFilter.isActive
//   delete newFilter.item

//   return `medidot/?filter=${JSON.stringify(newFilter)}`
// }
