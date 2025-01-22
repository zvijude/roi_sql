import { roleDic } from '@/db/types'
import { formatCurrency } from 'zvijude/funcs'
import SimpleTable from 'zvijude/table/SimpleTable'

export default function MainTaskTable({ rowsData }) {
  return (
    <SimpleTable headers={['משימה', 'כותרת', 'מחיר', 'פירוט', 'מיועדת ל', 'בסיום המשימה', 'אישור מנהל']}>
      <tbody>
        <tr>
          <td className="tblRow">0#</td>
          <td className="tblRow">סריקה</td>
          <td className="tblRow">סרוק את כל הפרטים, וקבע את סוגם ומיקומם</td>
          <td className="tblRow">מנהל פרויקט / ביצוע</td>
        </tr>
        {rowsData.sort((a, b) => a.order - b.order)
        .map((row, i) => {
          return (
            <tr key={i} className='hover:bg-slate-50/50'>
              <td className='tblRow'>{i + 1}#</td>
              <td className='tblRow'>{row.title}</td>
              <td className='tblRow'>{formatCurrency(row.price)}</td>
              <td className='tblRow'>{row.desc}</td>
              <td className='tblRow'>{roleDic[row.for]}</td>
              <td className='tblRow'>{row.media && <p>חובה תמונה או סרטון</p>}</td>
              <td className='tblRow'>{row.needApproval && <p>דורש אישור מנהל</p>}</td>
            </tr>
          )
        })}
      </tbody>
    </SimpleTable>
  )
}
