import { create } from "zustand"

interface StoreState {
  menuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

export const useStore = create<StoreState>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
}))
