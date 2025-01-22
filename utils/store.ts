import { proxy, useSnapshot } from 'valtio'

export const store = proxy<storeT>({
  oldTasks: [],
  oldParts: [],
  editMode: false,
  tmpParts: [],
})

type storeT = {
  tmpParts: TPart[]
  editMode: boolean
  oldTasks: any[]
  oldParts: any[]
}

export function useSnap() {
  return useSnapshot(store)
}

type TPart = {
  id: number
  name: string
  desc: string
  check: boolean
}
