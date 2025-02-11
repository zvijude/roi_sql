import GlobalLayout from '@/ui/GlobalLayout'

export default async function PopsRootLayout({ children }) {
  return (
    <GlobalLayout>
      <div className='m-4'>{children}</div>
    </GlobalLayout>
  )
}
