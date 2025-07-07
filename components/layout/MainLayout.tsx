import type React from "react"
import { Header } from "@/components/layout/Header"
import { MobileMenu } from "@/components/layout/MobileMenu"
import { Footer } from "@/components/layout/Footer"
import { FloatingButtons } from "@/components/ui/floating-buttons"
import { Toaster } from "@/components/ui/toaster"
import { getProfile } from "@/services/profileService"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  showFloatingButtons?: boolean
}

export async function MainLayout({ 
  children, 
  className = "flex flex-col relative min-h-screen bg-gradient-to-b from-background to-muted/30",
  showFloatingButtons = true 
}: MainLayoutProps) {
  // Obtener datos del perfil para el footer y floating buttons
  const profile = await getProfile(3)
  const phoneNumber = profile?.attributes?.field_phone || "+56942917068"

  return (
    <div className={className}>
      <Header />
      <MobileMenu />
      
      {children}
      
      <Footer profile={profile} />
      
      {/* Floating Buttons - opcional */}
      {showFloatingButtons && (
        <FloatingButtons phoneNumber={phoneNumber} />
      )}
      
      {/* Toaster para notificaciones */}
      <Toaster />
    </div>
  )
} 