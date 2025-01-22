'use client'

import Login from '@/auth/Login'
import Link from 'next/link'

export default function AuthPage() {
  return (
    <div className='grid place-items-center gap-6'>
      <div>
        <p className='text-lg'>התחברות עם גוגל</p>
        <Login />
      </div>

      <p className='absolute bottom-8 right-6 font-semibold'>
        אין לכם חשבון חברה עדיין?
        <Link className='text-blue-700 underline ms-1' href='/register'>
          לחצו כאן
        </Link>
      </p>
    </div>
  )
}
