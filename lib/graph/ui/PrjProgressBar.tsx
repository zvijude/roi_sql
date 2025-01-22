'use client'

import WrapChart from './WrapChart'

export default function ProjProgressBar({ finish = 0, total = 0 }) {
  const progress = total > 0 ? (finish / total) * 100 : 0

  return (
    <WrapChart title='תהליך הפרויקט'>
      <div className='bg-gray-200 rounded-lg w-8 h-64 mx-auto mt-4 overflow-hidden relative'>
        <div
          className='bg-green-600 w-full transition-all duration-500 absolute bottom-0 rounded-b-lg'
          style={{ height: `${progress}%` }}></div>
      </div>
      <p className='text-center mt-2 text-lg font-bold'>{progress.toFixed(2)}% הושלם</p>
    </WrapChart>
  )
}
