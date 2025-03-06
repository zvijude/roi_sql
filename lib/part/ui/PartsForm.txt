import { useSnap } from '@/utils/store'

export default function PartsForm({ prtsNoGrp }) {
  const { tmpParts } = useSnap()

  return (
    <form name='partsForm'>
      <div className='mt-6'>
        <p className='font-bold mb-3'>בחר פרטים מהרשימה ליצירת שלבי התקנה</p>
        <div className='flex gap-5'>
          {[...tmpParts, ...prtsNoGrp].map((part) => {
            return (
              <label className='flex gap-1.5 cursor-pointer' key={part.id} title={part.desc}>
                <input type='checkbox' defaultChecked={part.check} name={part.id} className='size-4' />
                <p>{part.name}</p>
              </label>
            )
          })}
        </div>
      </div>
    </form>
  )
}
