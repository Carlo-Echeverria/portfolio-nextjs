"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useStore } from "@/lib/store"

interface HeaderClientProps {
  children: React.ReactNode
}

export function HeaderClient({ children }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 py-5 ${
        scrolled ? "bg-background/80 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {children}
    </header>
  )
}

// Componente para los controles del header
export function HeaderControls() {
  const { theme, setTheme } = useTheme()
  const { menuOpen, toggleMenu } = useStore()
  const [mounted, setMounted] = useState(false)

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* Botón de tema */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Cambiar tema"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      {/* Botón de menú móvil */}
      <Button
        variant="ghost"
        size="icon"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        className="md:hidden"
        onClick={toggleMenu}
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  )
} 