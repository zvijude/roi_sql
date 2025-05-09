export enum Role {
  ADMIN = 'ADMIN',
  INSTALLER = 'INSTALLER',
  PRJ_MNGR = 'PRJ_MNGR',
  SITE_MNGR = 'SITE_MNGR',
  KABLAN = 'KABLAN',
  C_INSTALLER = 'C_INSTALLER',
}

export enum QrStatus {
  FINISH = 'FINISH',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_TASK = 'WAITING_TASK',
  ON_BGT_REQ = 'ON_BGT_REQ',
  ON_PROB = 'ON_PROB',
}

export interface Part {
  id?: number
  name: string
  prjId: number
  tasksId?: number | null
  qntt: number
  desc?: string
}

export enum TaskStatus {
  WAITING,
  SKIPPED,
  COMPLETED,
}

export enum ProbStatus {
  WAITING = 'WAITING',
  SOLVED = 'SOLVED',
  CANCELED = 'CANCELED',
  DENIED = 'DENIED', // BgtReq
  GRANTED = 'GRANTED',
}

export const EventType = {
  PROB: 'בעית ביצוע',
  BGT_REQ: 'בקשת חריגים',
  COMPLETED: 'משימה הושלמה',
  WAITING: 'משימה ממתינה לאישור',
  SKIPPED: 'משימה שדולגה',
}

// type problems
export const probStatusDic = {
  [ProbStatus.WAITING]: 'ממתין לטיפול',
  [ProbStatus.SOLVED]: 'טופל',
  [ProbStatus.CANCELED]: 'בוטל',
}

export const probStatusDicLbl = {
  'ממתין לטיפול': ProbStatus.WAITING,
  טופל: ProbStatus.SOLVED,
  בוטל: ProbStatus.CANCELED,
}

// type role
export const roleDic = {
  [Role.ADMIN]: 'אדמין',
  [Role.INSTALLER]: 'עובד קבלן',
  [Role.PRJ_MNGR]: 'מנהל פרויקט',
  [Role.SITE_MNGR]: 'מנהל ביצוע',
  [Role.KABLAN]: 'קבלן ראשי',
  [Role.C_INSTALLER]: 'מתקין ע.חברה',
}

export const roleDicLbl = {
  'עובד קבלן': Role.INSTALLER,
  אדמין: Role.ADMIN,
  'מתקין ע.חברה': Role.C_INSTALLER,
  'מנהל פרויקט': Role.PRJ_MNGR,
  'מנהל ביצוע': Role.SITE_MNGR,
  'קבלן ראשי': Role.KABLAN,
}

export const rolesOptions = [
  { value: Role.SITE_MNGR, label: 'מנהל ביצוע' },
  { value: Role.KABLAN, label: 'קבלן ראשי' },
  { value: Role.PRJ_MNGR, label: 'מנהל פרויקט' },
  { value: Role.INSTALLER, label: 'עובד קבלן' },
  { value: Role.C_INSTALLER, label: 'מתקין ע.חברה' },
  { value: Role.ADMIN, label: 'אדמין' },
]

export const roleLevels = {
  ADMIN: 100,
  PRJ_MNGR: 40,
  SITE_MNGR: 30,
  C_INSTALLER: 20,
  KABLAN: 15,
  INSTALLER: 10,
}

export function isManager(role: Role) {
  return roleLevels[role] >= 30
}

export function isInstaller(role: Role) {
  return role === Role.INSTALLER || role === Role.C_INSTALLER
}

export const mainHeader = [
  { key: 'date', label: 'תאריך', format: 'formatDateTime' },
  { key: 'qr.qrNum', label: 'QR' },
  { key: 'qr.loc', label: 'מיקום' },
  { key: 'qr.part.name', label: 'פרט' },
  { key: 'createdBy.name', label: 'נוצר ע"י' },
  { key: 'task.title', label: 'משימה' },
  { key: 'id', label: 'מזהה' },
]

export const qrStatusDic = {
  [QrStatus.FINISH]: 'כל המשימות הושלמו בהצלחה',
  [QrStatus.IN_PROGRESS]: 'בתהליך עבודה',
  [QrStatus.WAITING_TASK]: 'משימה ממתינה לאישור',
  [QrStatus.ON_BGT_REQ]: 'בקשת חריגים פתוחה',
  [QrStatus.ON_PROB]: 'בעית ביצוע',
}

export const MAX_MB = 100 // Max upload file size in MB

export const appOnlyUsers = [Role.INSTALLER, Role.C_INSTALLER, Role.KABLAN] as Role[]

export const gradTxt =
  'bg-gradient-to-r from-blue-700 to-pink-700 inline-block text-transparent bg-clip-text font-black text-xl mobile:text-lg'

export const eventDic = {
  COMPLETED: 'משימה הושלמה',
  WAITING: 'ממתין לאישור',
  SKIPPED: 'משימה דולגה',
  SOLVED: 'בעיה נפתרה',
  GRANTED: 'בקשת תקציב אושרה',
  DENIED: 'בקשת תקציב נדחתה',
  CANCELED: 'בוטל',
}

export const probDic = {
  BGT_REQ: 'בקשת תקציב',
  PROB: 'בעית ביצוע',
}
