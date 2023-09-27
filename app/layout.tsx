import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthProvider'
import { TailwindIndicator } from '@/app/components/tailwind-indicator'
import { Providers } from '@/app/components/providers'
import { Header } from '@/app/components/header'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextAuth Tutorial',
  description: 'Learn NextAuth.js by Dave Gray',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>

          <AuthProvider>
            {/* <Navbar /> */}
            <Header />
            <main className="flex justify-center items-start p-6 min-h-screen">
              {children}
            </main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}