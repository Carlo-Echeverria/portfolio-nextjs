import type React from "react"
import "@/styles/globals.css"
import { poppins } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/layout/MainLayout"

export const metadata = {
  title: "Carlo Echevrría - Desarrollador Full Stack",
  description: "Portfolio de Carlo Echevrría, desarrollador full stack con más de 7 años de experiencia en el desarrollo de aplicaciones web",
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
