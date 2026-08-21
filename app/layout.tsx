
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cineflow AI - Cinematic Video Studio',
  description: 'AI-Powered Cinematic Video Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#07090e] antialiased">
        {children}
      </body>
    </html>
  )
}
