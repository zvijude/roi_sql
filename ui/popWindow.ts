'use client'

let popupWindow: Window | null = null

export function popWindow(url) {
  const width = 600
  const height = 700

  const left = (window.innerWidth - width) / 2 + window.screenX
  const top = (window.screen.height - height) / 2

  const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=yes`

  if (popupWindow && !popupWindow.closed) {
    popupWindow.location.href = url
    popupWindow.focus()
  } else {
    popupWindow = window.open(url, '_blank', windowFeatures)
  }
}

let imgPopWindow: Window | null = null

export function popImg(url) {
  const width = 600
  const height = 600

  const left = (window.innerWidth - width) / 2 + window.screenX
  const top = (window.screen.height - height) / 2

  const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=yes`

  if (imgPopWindow && !imgPopWindow.closed) {
    imgPopWindow.location.href = url
    imgPopWindow.focus()
  } else {
    imgPopWindow = window.open(url, '_blank', windowFeatures)
  }
}
