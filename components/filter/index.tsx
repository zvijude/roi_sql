import { db } from '@/sql'
import { twMerge } from 'tailwind-merge'
import { Btn } from 'zvijude/btns'
import { Select } from 'zvijude/form'

type Props = {
  className?: string
  prjId: number
}

export default async function Filter({ className = '', prjId }) {
  const res = await db.raw(`SELECT _get_filter_fields(?);`, [prjId])
  const filterFields = res.rows[0]._get_filter_fields

  return (
    <form className={twMerge('flex items-end *:min-w-24', className)}>
      <Select lbl='חזית' options={[]} placeholder='הכל' />
      <Select lbl='קומה' options={[]} placeholder='הכל' />
      <Select lbl='דירה' options={[]} placeholder='הכל' />
      <Select lbl='תאריכים' options={[]} placeholder='הכל' />

      <Btn lbl='סינון' icon='filter' clr='text' />
    </form>
  )
}
