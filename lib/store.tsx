"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"

interface StoreState {
  menuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

const StoreContext = createContext<StoreState | undefined>(undefined)

interface StoreProviderProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const value = useMemo(
    () => ({ menuOpen, toggleMenu, closeMenu }),
    [menuOpen]
  )

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}

