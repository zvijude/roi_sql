'use client'

import { Html5Qrcode } from 'html5-qrcode'
import { Btn } from 'zvijude/btns'
import { useRouter } from 'next/navigation'
import { addScan } from '@/lib/scan/db/set'

export default function ScanQrCamera() {
  const router = useRouter()

  function onCamera() {
    const scn = new Html5Qrcode('reader')
    scn.start(
      { facingMode: 'environment' },
      { fps: 10 },
      (url) => {
        const regex = /(?<=\/project\/)\d+|(?<=\/qr\/)\d+/g
        const [prjId, qrNum] = url.match(regex) as any

        addScan({ prjId, qrNum })
        router.push(url)
        scn.stop()
      },
      onScanFailure
    )
  }

  function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`)
  }

  return (
    <main className='flex items-start gap-0'>
      <section className='w-screen place-items-center'>
        <Btn
          icon='qrcode'
          clr='icon'
          className='rounded-full fixed bottom-4 right-7'
          onClick={onCamera}
          popoverTarget='reader'
        />

        <div id='reader' popover='auto' className='w-screen h-[60%]'></div>
      </section>
    </main>
  )
}
