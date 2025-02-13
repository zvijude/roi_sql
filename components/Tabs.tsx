export default function Tabs() {
  return (
    <div className='border-b border-gray-200 dark:border-neutral-700'>
      <nav className='flex gap-x-1' aria-label='Tabs' role='tablist' aria-orientation='horizontal'>
        <button
          type='button'
          className='hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active'
          id='tabs-with-underline-item-1'
          data-hs-tab='#tabs-with-underline-1'
          role='tab'
        >
          Tab 1
        </button>
        <button
          type='button'
          className='hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500'
          id='tabs-with-underline-item-2'
          data-hs-tab='#tabs-with-underline-2'
          role='tab'
        >
          Tab 2
        </button>
        <button
          type='button'
          className='hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500'
          id='tabs-with-underline-item-3'
          data-hs-tab='#tabs-with-underline-3'
          role='tab'
        >
          Tab 3
        </button>
      </nav>
    </div>
  )
}
