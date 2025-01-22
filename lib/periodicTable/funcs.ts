// import { groupBy } from '@/utils/func'
// import { testCompletion } from '../qr/funcs'

// export function formatPeriodic(qrArr) {
//   const temp = qrArr.map((qr) => {
//     const waitingTasks = qr.tasks.filter((t) => t.mainTask.price > 0 && t.completed && !t.approved)

//     const curTask = testCompletion(qr.tasks)
//     const qrStyle = getQrStyle(qr, curTask, waitingTasks)
//     return {
//       qrNum: qr.qrNum,
//       qrStyle,
//       floor: qr.floor,
//     }
//   })

//   const floors = groupBy(temp, ({ floor }) => floor)
//   return floors
// }

// function getQrStyle(qr, curTask, waitingTasks) {
//   const { probs, bgtReqs } = qr

//   const boxColorConditions = [
//     {
//       condition: probs?.length > 0,
//       clr: 'red',
//       icon: 'triangle-exclamation',
//       txt: 'בעית ביצוע',
//     },
//     {
//       condition: bgtReqs?.length > 0,
//       clr: 'yellow',
//       icon: 'hand-holding-dollar',
//       txt: 'בקשת חריגים',
//     },
//     {
//       condition: waitingTasks?.length > 0,
//       clr: 'blue',
//       icon: 'hourglass-half',
//       txt: 'משימה הממתינה לאישור',
//     },
//     {
//       condition: curTask?.finished,
//       clr: 'green',
//       icon: 'shield-check',
//       txt: 'כל המשימות הושלמו',
//     },
//     // {
//     //   condition: curTask?.completed,
//     //   clr: 'gray',
//     //   icon: 'check',
//     //   txt: 'חלק מהמשימות הושלמו',
//     // },
//     {
//       condition: true,
//       clr: '',
//       icon: '',
//       txt: null,
//     },
//   ]

//   // bg-green-800
//   // bg-red-800
//   // bg-blue-800
//   // bg-yellow-800

//   return boxColorConditions.find(({ condition }) => condition)
// }

// export function formatQrPeriodicPop(qr) {
//   const { completedTasks, waitingTasks, skippedTasks, probs, bgtReqs } = qr

//   const { false: unsolved, true: solved } = groupBy(probs, ({ status }) => status)
//   const bgt = groupBy(bgtReqs, ({ rawGranted }) => rawGranted)

//   const tmpBgt = [].concat(bgt.GRANTED, bgt.DENIED)

//   return {
//     history: {
//       completedTasks,
//       skippedTasks,
//       solved,

//       bgt: tmpBgt,
//     },
//     active: {
//       unsolved,
//       waiting: bgt.WAITING,
//       waitingTasks,
//     },
//   }
// }
