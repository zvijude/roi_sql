import Missing from "@/components/missing"

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)

  return (
    <div>
      <Missing prjId={prjId} filter={[]} />
    </div>
  )
}
