'use client'

import { useState, useEffect } from 'react'
import { Btn } from 'zvijude/btns'

export default function AddToHomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      // Type cast the event to BeforeInstallPromptEvent
      const promptEvent = e as BeforeInstallPromptEvent

      console.log('promptEvent', promptEvent)
      e.preventDefault()
      setDeferredPrompt(promptEvent)
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt')
      handler(e)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleAddToHomeScreen = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      setDeferredPrompt(null)
      setShowButton(false)
    }
  }

  return showButton && <Btn lbl="Add to Home Page" onClick={handleAddToHomeScreen} />
}

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt: () => void
}
