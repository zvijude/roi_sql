import { revalidatePath } from 'next/cache'

export function formatTasks(tasks, prjId, tasksId) {
  return tasks.map((t, i) => {
    t.media = t.media ? true : false
    t.needApproval = t.needApproval ? true : false
    return { ...t, order: i, id: Number(t.id), tasksId, prjId }
  })
}

export async function revalidateProject() {
  revalidatePath(`/project`)
}
