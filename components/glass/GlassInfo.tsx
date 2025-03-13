'use client'
import { useState } from 'react'
import { Btn } from 'zvijude/btns'
import { Input, SelectObj } from 'zvijude/form'
import { getFormData } from 'zvijude/form/funcs'
import SimpleTable from 'zvijude/table/SimpleTable'
import { createGlassInfo, deleteGlassInfo } from './api'
import { toast } from 'zvijude/pop'
import Icon from 'zvijude/icon'

export default function GlassInfo({ parts, glassData, className = '' }) {
  const [editGlass, setEditGlass] = useState({}) as any

  async function onSubmit(e) {
    const data = getFormData(e)
    data.id = editGlass.id
    toast('loading')
    await createGlassInfo({ data })
    toast('success')

    e.target.reset()
    setEditGlass({})
  }

  async function deleteGlass(id) {
    if (!confirm('בטוח למחוק?')) return
    toast('loading')
    await deleteGlassInfo(id)
    toast('success')
  }

  return (
    <div className={className}>
      <form key={editGlass.id} onSubmit={onSubmit} className='paper mb-8'>
        <div className='flex items-end justify-between border-b pb-3'>
          <h2 className='flex'>
            <Icon name='rectangle-vertical-history' flip type='reg' className='size-5' />
            <span className='text-xl font-semibold'>כתב כמויות לזכוכיות</span>
          </h2>

          <Btn lbl='שמור זכוכית' icon='floppy-disk' />
        </div>
        <div className='grid grid-cols-2 gap-4 items-end mt-8'>
          <Input type='number' name='width' lbl='רוחב מ"מ' defaultValue={editGlass.width} />
          <Input type='number' name='height' lbl='גובה מ"מ' defaultValue={editGlass.height} />
          <Input type='number' name='thick' lbl='עובי מ"מ' required={false} defaultValue={editGlass?.thick} />
          <Input name='props' lbl='מאפיינים' required={false} defaultValue={editGlass?.props} />
          <SelectObj name='partId' options={parts} val='id' show='name' placeholder='בחר פרט' defaultValue={editGlass.partId} />
        </div>
      </form>

      <SimpleTable headers={["מס'", 'שם הפרט', 'רוחב', 'גובה', 'עובי', 'מאפיינים', 'עריכה / מחיקה']}>
        <tbody>
          {glassData.map((row, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}#</td>
                <td>{row.partName}</td>
                <td>{row.width}</td>
                <td>{row.height}</td>
                <td>{row.thick}</td>
                <td>{row.props}</td>

                <td>
                  <div className='flex'>
                    <Btn clr='icon' onClick={() => setEditGlass({ ...row })} icon='pen' />
                    <Btn clr='icon' onClick={() => deleteGlass(row.id)} icon='trash' />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </SimpleTable>
    </div>
  )
}
