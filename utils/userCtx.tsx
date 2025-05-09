'use client'

import { useContext, useState, createContext } from 'react'
import { Role } from '@/db/types'

const UserCtx = createContext(null as any)

export default function UserProvider({ children, data }) {
  const [user, setUser] = useState(data)

  return <UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>
}

export function useUser() {
  const ctx = useContext(UserCtx)
  if (!ctx) throw new Error('useUser must be used within a UserProvider')

  return ctx as {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<any>>
  }
}

type User = {
  id: number
  email: string
  role: Role
  name: string
  companyId: number
  projects: {
    id: number
    name: string
  }[]
  picture?: string
  expires?: string
  iat?: number
  exp?: number
}
