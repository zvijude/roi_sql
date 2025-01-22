'use server'

import { db } from '@/db/db'
import { formatTasks, revalidateProject } from '@/lib/mainTask/funcs'
import getDiff from 'diff-arrays-of-objects'
import { genId } from '@/utils/func'
import { onErr } from '@/db/errors'

// Create
export async function crtMainTask({ tasks, partIds, prjId }) {
  const tasksId = genId()

  tasks = formatTasks(tasks, prjId, tasksId)
  tasks.map((t) => (t.price = Number(t.price)))

  await db
    .$transaction([
      db.mainTask.createMany({
        data: tasks,
      }),
      db.part.updateMany({
        where: {
          id: { in: partIds },
        },
        data: {
          tasksId,
        },
      }),
    ])
    .catch((err) => {
      return { err: true, msg: `שגיאה בשמירת הנתונים ${err}` }
    })

  revalidateProject()

  return { err: false, msg: 'המשימות נשמרו בהצלחה' }
}

// Update
export async function updateMainTask({ tasks, oldTasks, partIds, oldPartsIds, prjId }) {
  const tasksId = oldTasks[0].tasksId

  tasks = formatTasks(tasks, prjId, tasksId)

  const { removed, updated, added } = getDiff(oldTasks, tasks)
  const removeParts = oldPartsIds.filter((element) => !partIds.includes(element))
  const addParts = partIds.filter((element) => !oldPartsIds.includes(element))

  const updatedTasks = updated.map((tsk: any) => {
    return db.mainTask.update({
      where: {
        id: tsk.id,
      },
      data: { ...tsk, price: Number(tsk.price) },
    })
  })

  const addedTasks = added.map((tsk: any) => {
    return db.mainTask.create({
      data: { ...tsk, price: Number(tsk.price) },
    })
  })

  const deletedTasks = db.mainTask.deleteMany({
    where: {
      id: { in: removed.map(({ id }) => id) },
    },
  })

  const addedParts = db.part.updateMany({
    where: { id: { in: addParts } },
    data: { tasksId },
  })

  const removedParts = db.part.updateMany({
    where: { id: { in: removeParts } },
    data: { tasksId: null },
  })

  const res = await db
    .$transaction([addedParts, removedParts, ...updatedTasks, ...addedTasks, deletedTasks])
    .catch(onErr)

  revalidateProject()

  return res
}

// Delete
export async function deleteMainTask({ tasks, partIds }) {
  await db
    .$transaction([
      db.mainTask.deleteMany({
        where: {
          id: { in: tasks.map((el) => el.id) },
        },
      }),
      db.part.updateMany({
        where: {
          id: { in: partIds },
        },
        data: {
          tasksId: null,
        },
      }),
    ])
    .catch((e) => {
      return { failed: true, msg: `שגיאה במחיקת המשימות error: ${e}` }
    })

  revalidateProject()
  return 'deleted'
}
