import { Btn } from 'zvijude/btns'
import { getPeriodic } from './db'
import PeriodicTable from './ui/Tbl'
import { getFields } from '../filter/getFields'
import PeriodicFilter from './ui/FilterPeriodic'
import { getPartsByPrj } from '../setup/part/db'

export default async function Periodic({ prjId, filter }) {
  const periodicData = await getPeriodic(prjId, filter)
  const fields = await getFields(prjId)
  const parts = await getPartsByPrj(prjId)

  return (
    <div>
      <Btn
        lbl='חזרה למסך הראשי'
        href={`/project/${prjId}/events/tasks`}
        className='absolute top-14 left-4'
        clr='text'
        icon='arrow-right'
      />
      <PeriodicFilter filter={filter} fields={fields} parts={parts} />
      <PeriodicTable qrsData={periodicData} prjId={prjId} />
    </div>
  )
}
