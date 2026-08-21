"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { UpgradeModal } from "./upgrade-modal"

type ProContextValue = {
  openUpgrade: (feature?: string) => void
}

const ProContext = createContext<ProContextValue | null>(null)

export function useUpgrade() {
  const ctx = useContext(ProContext)
  if (!ctx) throw new Error("useUpgrade must be used within ProProvider")
  return ctx
}

export function ProProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [feature, setFeature] = useState<string | undefined>(undefined)

  const openUpgrade = useCallback((f?: string) => {
    setFeature(f)
    setOpen(true)
  }, [])

  return (
    <ProContext.Provider value={{ openUpgrade }}>
      {children}
      <UpgradeModal open={open} feature={feature} onClose={() => setOpen(false)} />
    </ProContext.Provider>
  )
}
