import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { useRouter } from 'next/navigation'
import Icon from 'zvijude/icon'
import { formToQuery } from '@/utils/formToQuery'
import { roleDic, roleDicLbl } from '@/db/types'

export default function Filter({ query, fields }) {
  const router = useRouter()

  function onSubmit(e) {
    const data = getFormData(e) as any
    const query = formToQuery(data)

    const url = new URLSearchParams({ query: JSON.stringify(query) })
    router.replace('?' + url, { scroll: false })
  }

  function resetFilter() {
    const form = document.getElementById('filterForm') as HTMLFormElement
    form.reset()
    router.replace('?', { scroll: false })

    document.getElementById('filterWaitingTasks')?.hidePopover()
  }

  return (
    <div
      popover='auto'
      className='pop max-h-[75vh] w-[560px] scroll-bar overflow-y-auto'
      id='filterWaitingTasks'>
      <div className='inline-flex items-center gap-4 border-b pb-2 mb-6 border-slate-400'>
        <Icon name='filter' type='reg' />
        <p className='text-xl font-medium'>סינונים</p>
      </div>

      <form id='filterForm' onSubmit={onSubmit}>
        <section className='grid grid-cols-2 gap-4'>
          <Select
            lbl='מספר QR'
            name='qrNum'
            options={fields.qrs}
            defaultValue={query?.qr?.qrNum}
            placeholder='הכל...'
            required={false}
          />
          <Select
            lbl='בוצע ע"י'
            name='user'
            options={fields.users}
            placeholder='כולם...'
            defaultValue={query?.completedBy?.name}
            required={false}
          />

          <Select
            lbl='פרט'
            name='part'
            options={fields.parts}
            placeholder='הכל...'
            defaultValue={query?.qr?.part?.name}
            required={false}
          />

          <Select
            lbl='לביצוע ע"י'
            name='role'
            options={Object.keys(roleDicLbl)}
            placeholder='הכל...'
            defaultValue={roleDic[query?.mainTask?.for]}
            required={false}
          />
          <Select
            lbl='מספר קומה'
            name='floor'
            options={fields.floors}
            defaultValue={query?.qr?.floor}
            placeholder='הכל...'
            required={false}
          />
          <Select
            lbl='מספר דירה'
            name='aptNum'
            options={fields.aptNums}
            defaultValue={query?.qr?.aptNum}
            placeholder='הכל...'
            required={false}
          />
          <div>
            <h3>תאריך השלמת המשימה</h3>
            <Input
              lbl='החל מ- '
              type='date'
              name='fromDate'
              defaultValue={
                query?.completedAt?.gte
                  ? new Date(query?.completedAt?.gte).toISOString().split('T')[0]
                  : ''
              }
              required={false}
            />
            <Input
              lbl='עד- '
              type='date'
              name='toDate'
              defaultValue={
                query?.completedAt?.lte
                  ? new Date(query?.completedAt?.lte).toISOString().split('T')[0]
                  : ''
              }
              required={false}
            />
          </div>
        </section>

        <section className='grid grid-cols-2 gap-4 mt-8'>
          <Btn clr='text' lbl='אפס סינונים' type='button' onClick={resetFilter} icon='eraser' />
          <Btn clr='solid' lbl='שמור סינונים' icon='floppy-disk' />
        </section>
      </form>
    </div>
  )
}
