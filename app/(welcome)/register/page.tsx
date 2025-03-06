'use client'

import { toast } from 'zvijude/pop'
import { addCompany } from '@/components/user/api'
import { Input } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import { useRouter } from 'next/navigation'
import { Btn } from 'zvijude/btns'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()

  async function createAccount(e) {
    const data = getFormData(e)
    toast('loading')
    await addCompany(data)

    toast('success', 'החשבון נוצר בהצלחה, התחבר עם חשבון המייל שלך')

    router.push('/auth')
  }

  return (
    <>
      <h2 className='pb-2 mb-4 border-b text-xl'>יצירת חשבון חברה</h2>
      <form className='min-w-52 grid grid-cols-2 gap-4' id='newProjForm' onSubmit={createAccount}>
        <Input lbl='שם פרטי' name='firstName' />
        <Input lbl='שם משפחה' name='lastName' />

        <Input lbl='שם החברה' name='companyName' />
        <Input lbl='מייל להתחברות' type='email' name='email' />
        <Input lbl='מספר טלפון' type='tel' name='phone' />

        <Btn lbl='צור חשבון חברה' icon='users' className='col-span-2 mt-4' />
      </form>
      <p className='mt-4'>
        כבר יש לך חשבון?
        <Link className='text-blue-700 underline' href='/'>
          לחץ כאן
        </Link>
      </p>
    </>
  )
}
