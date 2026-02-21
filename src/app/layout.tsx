import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { AppProviders } from "./providers"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "LinkHub - Your Social Links Hub",
  description: "Showcase all your social media links in one beautiful place",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${poppins.className} font-sans antialiased min-h-screen bg-background text-foreground`} style={{ isolation: 'auto' }}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
