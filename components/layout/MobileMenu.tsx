"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useStore } from "@/lib/store"
import { NavLink } from "./NavLink"

export function MobileMenu() {
  const { menuOpen, closeMenu } = useStore()

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
            <NavLink href="/" label="Inicio" />
            <NavLink href="/#about" label="Sobre Mí" />
            <NavLink href="/#projects" label="Proyectos" />
            <NavLink href="/#skills" label="Habilidades" />
            <NavLink href="/blog" label="Blog" />
            <NavLink href="/#contact" label="Contacto" />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
