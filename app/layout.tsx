import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/layout/MainLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Carlo Echeverría | Desarrollador Web Full Stack",
  description: "Desarrollador Full Stack con más de 7 años de experiencia en el desarrollo web",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
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
