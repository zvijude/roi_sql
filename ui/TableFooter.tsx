import { Btn } from 'zvijude/btns'

export default function TableFooter() {
  return (
    <div className="flex justify-between p-4 bg-white border border-t-0 rounded-b-md">
      <p>סה"כ 12 תוצאות</p>
      <div className="flex">
        <Btn lbl="הקודם" clr="text" icon="angle-right" size="small" />
        <Btn lbl="הבא" clr="text" icon="angle-left" className="flex-row-reverse" size="small" />
      </div>
    </div>
  )
}
