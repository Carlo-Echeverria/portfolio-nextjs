import type React from "react"
import "@/styles/globals.css"
import { poppins } from "@/lib/fonts"
import { ThemeProvider } from "@/components/theme-provider"
import { StoreProvider } from "@/lib/store"
import { MainLayout } from "@/components/layout/MainLayout"
import { generateBaseMetadata } from "@/lib/seo"

export const metadata = generateBaseMetadata()

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
          <StoreProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
