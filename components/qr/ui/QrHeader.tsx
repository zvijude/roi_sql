import { isManager, roleDic, roleLevels } from '@/db/types'
import Icon from 'zvijude/icon'
import EditLocQrPop from './EditLocQrPop'

export default function QrHeader({ userRole, qrData, aptOpt, curTask }) {
  const taskFor = curTask.for
  const isAuthorized = roleLevels[userRole] >= roleLevels[taskFor]

  return (
    <>
      {!isAuthorized && (
        <div className='text-center text-red-600 font-bold'>
          <p>* אין לך הרשאה לבצע משימה זו *</p>
          <p>
            המשימה מיועדת ל{roleDic[taskFor]} ותפקידך הוא {roleDic[userRole]}
          </p>
        </div>
      )}
      <div className='grid grid-cols-2 gap-2 text-sm w-full bg-white p-3 rounded shadow-1'>
        <p>
          <span className='font-bold'>ברקוד:</span> {qrData.qrNum}
        </p>
        <p>
          <span className='font-bold'>מזהה משימה:</span> {curTask.TaskId}
        </p>
        <p>
          <span className='font-bold'>עבור:</span> {roleDic[curTask.for]}
        </p>
        <p>
          <span className='font-bold'>משימה:</span> {curTask.order + 1} מתוך {qrData.totalTasksCount}
        </p>
        <div className='col-span-2 flex items-center gap-2'>
          <span className='font-bold'>מיקום:</span> {qrData.loc}
          {isManager(userRole) && (
            <button popoverTarget='editLocQrPop'>
              <Icon name='pen' className='size-3.5' />
            </button>
          )}
        </div>
        <div className='flex gap-0.5 col-span-2'>
          <span className='font-bold'>פרט:</span>
          <p>
            <span className='font-semibold'>{qrData.name}</span> {qrData.desc}
          </p>
        </div>
      </div>
      <EditLocQrPop qrData={qrData} aptOpt={aptOpt} />
    </>
  )
}
