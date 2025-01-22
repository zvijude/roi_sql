'use client'

import Script from 'next/script'

export default function GoogleTranslate() {
  function translateInit() {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'iw', // Language of your page
          includedLanguages: 'en,ar,zh-CN,ru,iw',
          // iw is Hebrew, zh-CN is Chinese, ru is Russian, ar is Arabic
        },
        'google_translate_element'
      )
    }
  }

  return (
    <div className='fixed bottom-2 left-4'>
      <Script
        src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        strategy='lazyOnload'
        onLoad={translateInit}
      />
      <div className='fixed bottom-4 left-2'>
        <button
          popoverTarget='popTrans'
          className=' bg-white
          w-12 h-12
           border border-blue-400 
           text-white rounded-full shadow-xl
           hover:bg-blue-100 transition'
          aria-label='Toggle Google Translate'>
          🌐
        </button>
      </div>

      <div popover='auto' id='popTrans' className='pop'>
        <p className='!text-black text-center font-semibold'>תרגום 🌐</p>
        <div id='google_translate_element'></div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string
            includedLanguages: string
          },
          elementId: string
        ) => void
      }
    }
    googleTranslateElementInit: () => void
  }
}
