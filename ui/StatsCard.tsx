import Icon from 'zvijude/icon'

export default function StatsCard({ icon, lbl, clr, stat, update = 'dfsdfsdf' }) {
  return (
    <div className='bg-white rounded-lg shadow-3 py-3 px-4'>
      <div className='flex w-60 items-start gap-8 justify-between'>
        <span
          style={{ background: clr }}
          className='rounded-xl size-14 text-white -mt-7 grid place-items-center shadow-3'>
          <Icon name={icon} className='size-5 bg-white' type='sol' />
        </span>

        <div className=''>
          <p className='text-gray-500'>{lbl}</p>
          <p className='text-3xl font-bold text-gray-800 text-left'>{stat}</p>
        </div>
      </div>

      <BorderLine />

      <p className='text-sm text-gray-500'>
        <span> {update}</span>
      </p>
    </div>
  )
}

function BorderLine() {
  return (
    <div className='relative py-3'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent' />
      </div>
    </div>
  )
}
