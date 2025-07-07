"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WhatsappFloatingButtonProps {
  phoneNumber?: string
  message?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  delay?: number
  standalone?: boolean
}

export function WhatsappFloatingButton({ 
  phoneNumber = "+56942917068",
  message = "¡Hola! Me interesa contactarte para un proyecto.",
  position = "bottom-right",
  delay = 0.5,
  standalone = true
}: WhatsappFloatingButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openWhatsApp = () => {
    try {
      const encodedMessage = encodeURIComponent(message)
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "")
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Error opening WhatsApp:", error)
      // Fallback: copy phone number to clipboard
      navigator.clipboard?.writeText(phoneNumber)
    }
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
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={openWhatsApp}
                size="lg"
                className="relative h-12 w-12 md:h-14 md:w-14 rounded-full bg-green-500 dark:bg-green-600 p-0 shadow-lg hover:bg-green-600 dark:hover:bg-green-700 hover:shadow-xl transition-all duration-300 group"
                aria-label="Contactar por WhatsApp"
              >
                {/* Pulse animation */}
                <div className="absolute inset-0 rounded-full bg-green-400 dark:bg-green-500 animate-ping opacity-20 group-hover:opacity-30" />
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white relative z-10" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side={position.includes("right") ? "left" : "right"}>
            <p>Contactar por WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
} 