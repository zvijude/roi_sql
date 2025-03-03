import { AddGlass } from '@/components/glass/AddGlass'
import { AddGlassPallet } from '@/components/glass/AddGlassPallet'
import { getGlassPallets } from '@/components/glass/db'
import GlassPalletCard from '@/components/glass/GlassPalletCard'

export default async function Page({ params }) {
  let { prjId } = await params
  prjId = Number(prjId)

  const glassPallets = await getGlassPallets(prjId)

  return (
    <div>
      <AddGlassPallet prj_id={prjId} />
      <GlassPalletCard glassPallets={glassPallets} />
      <AddGlass glass_pallets={glassPallets} />
    </div>
  )
}
