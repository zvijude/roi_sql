import { isManager, roleDic, roleLevels } from '@/db/types'
import Icon from 'zvijude/icon'
import EditLocQrPop from './EditLocQrPop'

export default function QrHeader({ userRole, qrData, aptOpt }) {
  const curTask = qrData.curTask
  const isAuthorized = roleLevels[userRole] >= roleLevels[qrData.curTask.for]

  return (
    <>
      {!isAuthorized && (
        <div className='text-center text-red-600 font-bold'>
          <p>* אין לך הרשאה לבצע משימה זו *</p>
          <p>
            המשימה מיועדת ל{roleDic[curTask.for]} ותפקידך הוא {roleDic[userRole]}
          </p>
        </div>
      )}
      <div className='grid grid-cols-2 mt-4 gap-1 text-sm w-full'>
        <p>
          <span className='font-bold'>ברקוד:</span> {qrData.qrNum}
        </p>
        <p>
          <span className='font-bold'>מזהה משימה:</span> {curTask.id}
        </p>
        <p>
          <span className='font-bold'>עבור:</span> {roleDic[curTask.for]}
        </p>
        <p>
          <span className='font-bold'>סדר המשימה:</span> {curTask.order + 1} מתוך{' '}
          {qrData.totalTasksCount}
        </p>
        <div className='col-span-2 flex items-center gap-2'>
          <span className='font-bold'>מיקום:</span> {qrData.loc}
          {isManager(userRole) && (
            <button popoverTarget='editLocQrPop'>
              <Icon name='pencil' className='size-4' />
            </button>
          )}
        </div>
        <div className='flex gap-0.5 col-span-2'>
          <span className='font-bold'>פרט:</span>
          <p>
            <span className='font-semibold'>{qrData.part.name}</span> {qrData.part.desc}
          </p>
        </div>
      </div>
      <EditLocQrPop qrData={qrData} aptOpt={aptOpt} />
    </>
  )
}
