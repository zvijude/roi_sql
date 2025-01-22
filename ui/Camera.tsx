'use client'
import React, { useState, useEffect, useRef } from 'react'

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const photoRef = useRef<HTMLCanvasElement>(null)
  const [isCamera, setIsCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [chunks, setChunks] = useState<any[]>([])
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  // Toggle the camera on and off
  async function toggleCamera() {
    // Stop the camera
    if (isCamera === true) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setIsCamera(false)
    } else {
      // Start the camera
      const tmp = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 300,
          height: 300,
          facingMode: 'environment',
        },
        audio: false,
      })
      setStream(tmp)
      if (videoRef.current) {
        videoRef.current.srcObject = tmp
        videoRef.current.play()
      }
      setIsCamera(true)
    }
  }

  // Take a photo
  const takePhoto = () => {
    const width = 300
    const height = 300
    let video = videoRef.current
    let photo = photoRef.current
    if (!video || !photo) return

    photo.width = width
    photo.height = height
    let context = photo.getContext('2d') as CanvasRenderingContext2D
    context.drawImage(video, 0, 0, width, height)

    const webpDataUrl = photo.toDataURL('image/webp')
    console.log('Photo taken', webpDataUrl)
  }

  // Close the photo
  const closePhoto = () => {
    let photo = photoRef.current
    if (!photo) return
    let context = photo.getContext('2d') as CanvasRenderingContext2D
    context.clearRect(0, 0, photo.width, photo.height)
  }

  const startRecording = () => {
    if (stream) {
      const recorder = new MediaRecorder(stream)
      setMediaRecorder(recorder)
      setChunks([]) // Clear previous chunks

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setChunks((prev) => [...prev, event.data])
        }
      }

      recorder.start()
      console.log('Recording started')
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      console.log('Recording stopped')
    }

    // Process the chunks and create the video URL here after the stop
    const blob = new Blob(chunks, { type: 'video/webm' })
    const newVideoURL = URL.createObjectURL(blob)
    // Immediately set the video URL
    setVideoURL(newVideoURL)
  }

  const removeVideo = () => {
    setVideoURL(null)
  }

  useEffect(() => {
    toggleCamera()
  }, [videoRef])

  return (
    <div className='mt-10'>
      <h1>Camera</h1>
      <button onClick={toggleCamera}>{isCamera ? 'close' : 'open'}</button>

      {isCamera && (
        <div className=''>
          <video ref={videoRef}></video>
          <button onClick={takePhoto}>Snap!</button>
          <button onClick={startRecording}>Start Video</button>
          <button onClick={stopRecording}>Stop Video</button>

          <canvas ref={photoRef}></canvas>
          <button onClick={closePhoto}>CLOSE!</button>
        </div>
      )}

      {videoURL && (
        <div className='recorded-video mt-6'>
          <h2 className='text-lg font-semibold'>Recorded Video:</h2>
          <video src={videoURL} controls width='300' className='mt-2'></video>
          <button onClick={removeVideo}>removeVideo</button>
        </div>
      )}
    </div>
  )
}
