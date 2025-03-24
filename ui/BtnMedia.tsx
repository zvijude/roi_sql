import { Btn } from 'zvijude/btns'
import ImgsCom from './imgsCom'

export default function BtnMedia({ media, item }) {
  if (!media?.[0]) return null
  return (
    <>
      <Btn icon='image' popoverTarget={`popMedia-${item.id}`} clr='icon' className='size-7 border-none shadow-none' />
      <div popover='auto' id={`popMedia-${item.id}`} className='pop size-96'>
        <ImgsCom urls={media} />
      </div>
    </>
  )
}
