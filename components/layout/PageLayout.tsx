import type React from "react"

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  showContainer?: boolean
}

export function PageLayout({ 
  children, 
  className = "min-h-screen",
  containerClassName = "container px-4 md:px-6 py-24",
  showContainer = true
}: PageLayoutProps) {
  if (!showContainer) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className={containerClassName}>
        {children}
      </div>
    </div>
  )
} 