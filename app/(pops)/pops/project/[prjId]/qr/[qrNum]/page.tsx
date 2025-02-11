import { qrStatusDic } from '@/db/types'
// import { getQrPeriodicPop } from '@/lib/periodicTable/db/get'
import EventPop from '@/lib/events/ui/EventPop'
import { formatDateTime } from 'zvijude/dates/funcs'

export default async function QrHistory({ params: { prjId, qrNum } }: any) {
  return <pre>{JSON.stringify({ prjId, qrNum }, null, 2)}</pre>
  // const { qrEvents, qrSetupData } = (await getQrPeriodicPop(prjId, qrNum)) as any

  // return (
  //   <div className='m-2 mb-6'>
  //     <div>
  //       <h1 className='text-2xl font-bold mb-3 text-center'>היסטוריה QR {qrNum}</h1>
  //       <div className='grid gap-2 mb-2 mx-4'>
  //         <section>
  //           <p>
  //             נוצר ע"י {qrSetupData.createdBy?.name}, ב- {formatDateTime(qrSetupData.createdAt)}
  //           </p>
  //           <p>ב{qrSetupData.loc}</p>
  //         </section>

  //         <section>
  //           <p>פרט {qrSetupData.part?.name}</p>
  //           <p>{qrSetupData.part?.desc}</p>
  //         </section>

  //         <section>
  //           <p>סטטוס: {qrStatusDic[qrSetupData.status]}</p>
  //           <p>
  //            שלב {qrSetupData.totalTasksCompleted + 1}/{qrSetupData.totalTasksCount}
  //           </p>
  //         </section>
  //       </div>
  //     </div>

  //     <div className='grid gap-4'>
  //       {qrEvents.map((t) => (
  //         <EventPop item={t} type={''} />
  //       ))}
  //     </div>
  //   </div>
  // )
}
