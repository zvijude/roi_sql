import { getQrHistory } from '@/components/qr/db'
import QrHistory from '@/components/qr/ui/QrHistory'

export default async function Page({ params }) {
  const { prjId, qrNum } = await params
  const res = await getQrHistory(prjId, qrNum)
  return <QrHistory history={res.history} />
  // return <pre>{JSON.stringify(res, null, 2)}</pre>
}
