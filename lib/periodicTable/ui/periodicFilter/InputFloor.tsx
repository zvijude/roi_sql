'use client'

import { useRouter } from 'next/navigation'
import { Input } from 'zvijude/form'

export default function InputFloor() {
  const router = useRouter()

  function onChange(e) {
    if (!e.target.value) {
      return router.replace('?')
    }
    router.replace(`?floor=${JSON.stringify(e.target.value)}`)
  }
  return (
    <div className='w-fit mb-8'>
      <Input lbl='בחר קומה' placeholder='קומה 10' onChange={onChange} type='number' />
    </div>
  )
}
