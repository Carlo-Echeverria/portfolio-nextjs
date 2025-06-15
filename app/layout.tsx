import type React from "react"
import "@/styles/globals.css"
import { poppins } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/layout/MainLayout"

export const metadata = {
  title: "Portfolio Profesional",
  description: "Una muestra de mi trabajo y habilidades como desarrollador",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
