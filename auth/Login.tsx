'use client'

import Script from 'next/script'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { checkUser } from './authFuncs'
import { useRouter } from 'next/navigation'
import { useUser } from '@/utils/userCtx'
import { toast } from 'zvijude/pop'

declare global {
  const google: any
}

export default function Login() {
  const router = useRouter()
  const u = useUser()

  useEffect(() => {
    if (u) router.push('/')
  }, [u])

  // GOOGLE LOGIN
  const client_id = process.env.NEXT_PUBLIC_GGLID

  async function callback(gglUser) {
    toast('loading')
    let user = null as any
    try {
      user = jwtDecode(gglUser.credential)

      const checkUserRes = await checkUser({
        email: user?.email,
        gglName: user.name,
        picture: user.picture,
        gglSub: user.sub,
      })

      console.log('checkUserRes', checkUserRes)

      checkUserRes.msg ? toast('error', 'המשתמש לא קיים במערכת') : toast('success')

      console.log('client user', user)
    } catch (error) {
      console.log('error', error)
    }
  }

  function initGoogle() {
    google.accounts.id.initialize({
      client_id,
      callback,
    })

    // google.accounts.id.prompt()
    document.getElementsByName('gglBtn').forEach((el) =>
      google.accounts.id.renderButton(el, {
        width: 250,
      })
    )

    // google.accounts.id.renderButton(document.getElementsByName(btnId)[0], {
    //   width: 250,
    // })
  }

  return (
    <div>
      <Script src='https://accounts.google.com/gsi/client' onLoad={initGoogle} strategy='lazyOnload' />

      <button name='gglBtn'></button>
    </div>
  )
}
