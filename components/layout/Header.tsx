"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useStore } from "@/lib/store"
import { NavLink } from "./NavLink"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { menuOpen, toggleMenu } = useStore()
  const [ scrolled, setScrolled ] = useState(false)

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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 py-3 shadow-md backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/" label="Inicio" />
          <NavLink href="/#about" label="Sobre Mí" />
          <NavLink href="/#projects" label="Proyectos" />
          <NavLink href="/#skills" label="Habilidades" />
          <NavLink href="/blog" label="Blog" />
          <NavLink href="/#contact" label="Contacto" />
        </nav>

        <div className="flex items-center gap-2">
          {/* Botón de tema */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cambiar tema"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
      </div>
    </header>
  )
}
