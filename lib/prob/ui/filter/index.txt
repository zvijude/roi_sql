import { Input, Select } from 'zvijude/form'
import { Btn } from 'zvijude/btns'
import { getFormData } from 'zvijude/form/funcs'
import { useRouter } from 'next/navigation'
import Icon from 'zvijude/icon'
import { formToQuery } from '@/utils/formToQuery'

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

    document.getElementById('filterProbPop')?.hidePopover()
  }

  return (
    <div
      popover='auto'
      className='pop max-h-[75vh] w-[560px] scroll-bar overflow-y-auto'
      id='filterProbPop'>
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
            lbl='סטטוס'
            name='solved'
            options={['פתור', 'לא פתור']}
            defaultValue={
              query?.status === 'SOLVED' ? 'פתור' : query?.status === 'WAITING' ? 'לא פתור' : ''
            }
            placeholder='הכל...'
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
            <h3>תאריך יצירת הבעיה</h3>
            <Input
              lbl='החל מ- '
              type='date'
              name='fromDate'
              defaultValue={
                query?.createdAt?.gte
                  ? new Date(query?.createdAt?.gte).toISOString().split('T')[0]
                  : ''
              }
              required={false}
            />
            <Input
              lbl='עד- '
              type='date'
              name='toDate'
              defaultValue={
                query?.createdAt?.lte
                  ? new Date(query?.createdAt?.lte).toISOString().split('T')[0]
                  : ''
              }
              required={false}
            />
          </div>

          <Select
            lbl='נוצר ע"י'
            name='user'
            options={fields.users}
            placeholder='כולם...'
            defaultValue={query?.reqBy?.name}
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
        </section>

        <section className='grid grid-cols-2 gap-4 mt-8'>
          <Btn clr='text' lbl='אפס סינונים' type='button' onClick={resetFilter} icon='eraser' />
          <Btn clr='solid' lbl='שמור סינונים' icon='floppy-disk' />
        </section>
      </form>
    </div>
  )
}

type DateRange = {
  gte?: Date
  lte?: Date
}

type Filter = {
  qr: {
    prjId: string
    floor?: number
    aptNum?: number
    part?: { name: string }
    qrNum?: number
  }
  solved?: boolean
  reqBy?: { name: string }
  createdAt?: DateRange
}
