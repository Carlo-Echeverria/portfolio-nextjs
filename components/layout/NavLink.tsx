"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useStore } from "@/lib/store"

interface NavLinkProps {
  href: string
  label: string
}

export function NavLink({ href, label }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false)
  const { closeMenu } = useStore()
  const router = useRouter()
  const pathname = usePathname()

  // Función para hacer scroll con offset del header y manejo de layout shifting
  const scrollToSection = (sectionId: string, retries = 0) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Calcular offset del header (aproximadamente 80px para header fijo)
      const headerOffset = 80
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })

      // Verificar si necesitamos reajustar después de layout shifting
      setTimeout(() => {
        const newPosition = section.getBoundingClientRect().top
        const currentScroll = window.pageYOffset
        const expectedPosition = currentScroll + newPosition - headerOffset

        // Si la posición cambió significativamente (layout shift), reajustar
        if (Math.abs(newPosition - headerOffset) > 10 && retries < 3) {
          window.scrollTo({
            top: expectedPosition,
            behavior: "smooth"
          })
          // Intentar una vez más después de un delay adicional
          if (retries < 2) {
            setTimeout(() => scrollToSection(sectionId, retries + 1), 500)
          }
        }
      }, 300)
    }
  }

  // Detectar si la sección está activa basada en el scroll
  useEffect(() => {
    // Solo verificar secciones activas si estamos en la página de inicio
    if (pathname !== "/") {
      setIsActive(false)
      return
    }

    const handleScroll = () => {
      // Para enlaces que no son de anchor (como /blog), no verificar scroll
      if (!href.startsWith("/#")) {
        setIsActive(pathname === href)
        return
      }

      const sectionId = href.replace("/#", "")
      const section = document.getElementById(sectionId)
      if (section) {
        const rect = section.getBoundingClientRect()
        // Ajustar la detección considerando el header offset
        const isInView = rect.top <= 120 && rect.bottom >= 120
        setIsActive(isInView)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Comprobar al montar
    return () => window.removeEventListener("scroll", handleScroll)
  }, [href, pathname])

  // Manejar scroll después de navegación para casos de layout shifting
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const sectionId = window.location.hash.replace("#", "")
      if (sectionId) {
        // Esperar a que se monte el componente y luego hacer scroll
        const timeouts = [100, 500, 1000, 2000] // Múltiples intentos
        timeouts.forEach((delay, index) => {
          setTimeout(() => {
            scrollToSection(sectionId, index)
          }, delay)
        })
      }
    }
  }, [pathname])

  const handleClick = (e: React.MouseEvent) => {
    closeMenu()

    // Si es un enlace de anchor (/#section)
    if (href.startsWith("/#")) {
      e.preventDefault()
      const sectionId = href.replace("/#", "")
      
      // Si ya estamos en la página de inicio, hacer scroll directamente
      if (pathname === "/") {
        scrollToSection(sectionId)
      } else {
        // Si estamos en otra página, navegar con el hash completo
        router.push(href)
      }
    }
    // Para enlaces normales (como /blog), dejar que Next.js maneje la navegación
  }

  // Determinar si el enlace está activo
  const getLinkActiveState = () => {
    if (href.startsWith("/#")) {
      // Para enlaces de anchor, solo activo si estamos en home y en la sección
      return pathname === "/" && isActive
    } else {
      // Para enlaces normales, activo si coincide con la ruta actual
      return pathname === href
    }
  }

  return (
    <Link
      href={href}
      className={`relative px-1 py-2 text-foreground/80 transition-colors hover:text-foreground ${
        getLinkActiveState() ? "text-foreground" : ""
      }`}
      onClick={handleClick}
    >
      {label}
      {getLinkActiveState() && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />}
    </Link>
  )
}
