export default async function QrHistory({ params }) {
  const { prjId, qrNum } = await params
  return <pre>{JSON.stringify({ prjId, qrNum }, null, 2)}</pre>
}
