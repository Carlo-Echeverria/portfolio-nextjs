"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface BackToTopButtonProps {
  scrollThreshold?: number
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  standalone?: boolean
}

export function BackToTopButton({ 
  scrollThreshold = 300,
  position = "bottom-right",
  variant = "secondary",
  size = "lg",
  standalone = true
}: BackToTopButtonProps) {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > scrollThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const getPositionClasses = () => {
    if (!standalone) return ""
    
    switch (position) {
      case "bottom-left":
        return "bottom-4 left-4 md:bottom-6 md:left-6"
      case "top-right":
        return "top-4 right-4 md:top-6 md:right-6"
      case "top-left":
        return "top-4 left-4 md:top-6 md:left-6"
      default:
        return "bottom-4 right-4 md:bottom-6 md:right-6"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-10 w-10 md:h-12 md:w-12"
      case "default":
        return "h-12 w-12 md:h-14 md:w-14"
      case "lg":
        return "h-12 w-12 md:h-14 md:w-14"
      default:
        return "h-12 w-12 md:h-14 md:w-14"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4 md:h-5 md:w-5"
      case "default":
        return "h-5 w-5 md:h-6 md:w-6"
      case "lg":
        return "h-5 w-5 md:h-6 md:w-6"
      default:
        return "h-5 w-5 md:h-6 md:w-6"
    }
  }

  // Don't render on server side to avoid hydration issues
  if (!mounted) {
    return null
  }

  const containerClasses = standalone 
    ? `fixed ${getPositionClasses()} z-50`
    : "relative"

  return (
    <TooltipProvider>
      <div className={containerClasses}>
        <AnimatePresence>
          {showBackToTop && (
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={scrollToTop}
                    size={size}
                    variant={variant}
                    className={`${getSizeClasses()} rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
                    aria-label="Volver arriba"
                  >
                    <ArrowUp className={getIconSize()} />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side={position.includes("right") ? "left" : "right"}>
                <p>Volver arriba</p>
              </TooltipContent>
            </Tooltip>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
} 