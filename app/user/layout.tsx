import type React from "react"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {children}
    </div>
  )
} 