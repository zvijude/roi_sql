'use client'

import { useParams, useRouter } from 'next/navigation'
import { SelectObj } from 'zvijude/form'

export default function SelectKablan({ kablans, prjId }) {
  const router = useRouter()
  const kablanId = useParams().kablanId

  function onChange(e) {
    if (!e.target.value) return router.push(`/project/${prjId}/kablan`)
    router.push(`/project/${prjId}/kablan/${e.target.value}`)
  }

  return (
    <div className='flex'>
      <SelectObj
        lbl='בחר קבלן'
        name='kablanId'
        options={kablans}
        show='name'
        val='id'
        defaultValue={kablanId}
        placeholder='כל הקבלנים'
        onChange={onChange}
      />
    </div>
  )
}
