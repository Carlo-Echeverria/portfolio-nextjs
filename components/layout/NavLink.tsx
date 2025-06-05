"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"

interface NavLinkProps {
  href: string
  label: string
}

export function NavLink({ href, label }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false)
  const { closeMenu } = useStore()

  // Detectar si la sección está activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(href)
      if (section) {
        const rect = section.getBoundingClientRect()
        const isInView = rect.top <= 100 && rect.bottom >= 100
        setIsActive(isInView)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Comprobar al montar
    return () => window.removeEventListener("scroll", handleScroll)
  }, [href])

  const handleClick = () => {
    closeMenu()
  }

  return (
    <Link
      href={`${href}`}
      className={`relative px-1 py-2 text-foreground/80 transition-colors hover:text-foreground ${
        isActive ? "text-foreground" : ""
      }`}
      onClick={handleClick}
    >
      {label}
      {isActive && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />}
    </Link>
  )
}
