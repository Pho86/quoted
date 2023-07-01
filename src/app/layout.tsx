import './globals.css'
import { Inter, Encode_Sans } from 'next/font/google'
import { AuthContext, AuthContextProvider } from '@/context/AuthContext'
import NavBar from '@/components/NavBar'
import { useContext } from 'react'
import Head from 'next/head'
const encode = Encode_Sans({ subsets: ['latin'] })
export const metadata = {
  title: 'Quoted',
  description: 'Post and see other people\'s quotes on quotation!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${encode.className} mb-10`} >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <NavBar />
      </body>
    </html>
  )
}
