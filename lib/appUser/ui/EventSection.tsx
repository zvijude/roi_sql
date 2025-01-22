import { formatDateTime } from 'zvijude/dates/funcs'
import { formatCurrency } from 'zvijude/funcs'

export default function EventSection({ header, data, id }) {
  if (!data) return null
  return (
    <div className='flex p-4' id={id}>
      <h1 className='text-xl font-semibold mx-auto'>{header}</h1>
      {data.map((item) => (
        <div className='flex flex-col place-items-start paper text-sm mx-1 gap-0 p-3 w-full md:flex-row md:gap-6'>
          <p>
            <span className='font-bold'>QR מס':</span> {item.qr.qrNum}
          </p>
          {item.title && (
            <p>
              <span className='font-bold'>כותרת:</span> {item.title}
            </p>
          )}
          {item.desc && (
            <div className='w-full md:w-auto'>
              <p>
                <span className='font-bold'>תיאור:</span> {item.desc}
              </p>
            </div>
          )}
          <p>
            <span className='font-bold'>מיקום:</span> {item.loc}
          </p>
          <p>
            <span className='font-bold'>תאריך:</span> {formatDateTime(item.date)}
          </p>
          {item.amount && (
            <p>
              <span className='font-bold'>מחיר:</span> {formatCurrency(item.amount)}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
