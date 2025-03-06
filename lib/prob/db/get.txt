import { db } from '@/sql'

export async function getProbs(prjId: number) {
  return await db('_probs').where({ prjId })
}
