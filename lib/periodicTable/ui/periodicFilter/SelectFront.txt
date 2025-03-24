'use client'

import { useRouter } from 'next/navigation'
import { Select } from 'zvijude/form'

export default function SelectFront() {
  const router = useRouter()

  function onFrontChange(e) {
    if (!e.target.value) {
      return router.replace('?')
    }
    router.replace(`?front=${JSON.stringify(e.target.value)}`)
  }
  return (
    <div className='w-fit mb-8'>
      <Select
        lbl='בחר חזית'
        options={['צפונית', 'דרומית', 'מזרחית', 'מערבית']}
        name='front'
        placeholder='הכל'
        onChange={onFrontChange}
      />
    </div>
  )
}
