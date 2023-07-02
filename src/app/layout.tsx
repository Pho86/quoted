import './globals.css'
import { Encode_Sans } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'
import NavBar from '@/components/NavBar'
import { Suspense } from "react";
import Loading from "./loading";
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
      <body className={`${encode.className} mb-20 md:my-0` } >
        <AuthContextProvider>
          <NavBar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AuthContextProvider>
      </body>
    </html>
  )
}
