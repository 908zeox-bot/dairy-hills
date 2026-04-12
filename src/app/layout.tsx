import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dairy Hills | Denver Commercial Property',
  description: 'Dairy Hills — boutique co-working space for wellness professionals at 323 S Pearl St, Washington Park West, Denver CO.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">{children}</body>
    </html>
  )
}
