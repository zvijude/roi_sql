'use client'
import { popImg } from '@/ui/popWindow'

export default function ImgsCom({ urls }) {
  if (!urls) return null

  function onImgClick(url) {
    popImg(url)
  }

  return (
    <div className='flex place-content-center gap-2'>
      {urls.map((url, i) => (
        <div
          key={i}
          className='relative size-32 rounded-md shadow transition-transform hover:scale-105 cursor-pointer'
          onClick={() => onImgClick(url)}>
          {url.includes('video') ? (
            <video src={url} className='w-full h-full' controls />
          ) : (
            <img src={url} alt={`Media ${i + 1}`} className='w-full h-full' loading='lazy' />
          )}
        </div>
      ))}
    </div>
  )
}

// "https://res.cloudinary.com/dfzjde8p7/image/upload/v1733219507/main/odjf9q7z1zzaoiebwbdf.jpg",

function MediaCom({ urls }) {
  if (!urls) return null

  function onMediaClick(url) {
    popImg(url) // Adjust to handle videos if needed
  }

  return (
    <div className='flex place-content-center gap-2'>
      {urls.map((url, i) => (
        <div key={i} className='relative size-32'>
          {url.includes('video') ? ( // Simple check for video type
            <video
              src={url}
              className='w-full h-full rounded-md shadow transition-transform hover:scale-105 cursor-pointer'
              controls
              onClick={() => onMediaClick(url)}
            />
          ) : (
            <img
              src={url}
              alt={`Media ${i + 1}`}
              className='w-full h-full rounded-md shadow transition-transform hover:scale-105 cursor-pointer'
              loading='lazy'
              onClick={() => onMediaClick(url)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
