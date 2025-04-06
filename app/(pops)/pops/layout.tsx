import GlobalLayout from '@/ui/GlobalLayout'
import GoogleTranslate from '@/ui/GoogleTranslate'

export default async function PopsRootLayout({ children }) {
  return (
    <GlobalLayout>
      <div className='m-4'>{children}</div>
      <GoogleTranslate />
    </GlobalLayout>
  )
}
