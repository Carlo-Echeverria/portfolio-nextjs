"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useStore } from "@/lib/store"
import { NavLink } from "./NavLink"
import { ProcessedMenuItem } from "@/types/menu"

interface MobileMenuContentProps {
  menuItems: ProcessedMenuItem[]
}

export function MobileMenuContent({ menuItems }: MobileMenuContentProps) {
  const { menuOpen } = useStore()

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-background"
        >
          <nav className="flex flex-col items-center gap-8 text-2xl">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                href={item.url}
                label={item.title}
              />
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 