import { useRouter } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import { formatFilter } from './funcs'

export default function ActiveFilter({ filter }) {
  if (!filter) return null

  const formattedFilter = formatFilter(filter)

  const router = useRouter()
  function cancelFilters() {
    router.replace('?', { scroll: false })
  }
  return (
    <>
      <div className='flex bg-white mx-4'>
        <p className='font-semibold'>מסננים פעילים:</p>
        {formattedFilter.map(([title, value]) => (
          <p className='font-semibold text-sm'>
            <span className='font-bold'>{title}: </span>
            {value}
          </p>
        ))}
      </div>
      <Btn onClick={cancelFilters} lbl='אפס סננים' className='text-sm' clr='text' icon='eraser' />
    </>
  )
}
