"use client"

import { WhatsappFloatingButton } from "./whatsapp-floating-button"
import { BackToTopButton } from "./back-to-top-button"

interface FloatingButtonsProps {
  phoneNumber?: string
  whatsappMessage?: string
  scrollThreshold?: number
  showWhatsApp?: boolean
  showBackToTop?: boolean
}

export function FloatingButtons({
  phoneNumber = "+56942917068",
  whatsappMessage = "¡Hola! Me interesa contactarte para un proyecto.",
  scrollThreshold = 300,
  showWhatsApp = true,
  showBackToTop = true
}: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 md:gap-3">
      {/* WhatsApp Button */}
      {showWhatsApp && (
        <WhatsappFloatingButton 
          phoneNumber={phoneNumber} 
          message={whatsappMessage}
          position="bottom-right"
          delay={0.5}
          standalone={false}
        />
      )}
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <BackToTopButton 
          scrollThreshold={scrollThreshold}
          position="bottom-right"
          variant="secondary"
          size="lg"
          standalone={false}
        />
      )}
    </div>
  )
} 