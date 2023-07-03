"use client"
import Image from 'next/image'
import { useEffect, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Link from 'next/link'
export default function LandingPage() {
   // @ts-ignore
   const { user } = useContext(AuthContext)
   const router = useRouter()
   useEffect(() => {
      if (user != null) {
         router.push(`/home`)
      }
   }
      , [router, user])

   return (
      <main className="flex h-screen flex-col items-center justify-center z-[500]">
         <section className='flex flex-col gap-5 px-8 md:px-0 w-full justify-center items-center'>
            <Image src="/logo.svg" width={250} height={250} className="" alt="quoted logo" />
            <h1 className='text-4xl font-bold text-center'>welcome to quoted!</h1>
            <div className='flex flex-col w-full md:w-1/3'>
               <Link href="/login">
                  <Button><p>sign in</p></Button>
               </Link>
               <div className="flex items-center py-4">
                  <div className="flex-grow h-px bg-gray-400"></div>
                  <span className="flex-shrink text-xl text-gray-500 px-4 italic font-light">or</span>
                  <div className="flex-grow h-px bg-gray-400"></div>
               </div>
               <Link href="/login#register">
                  <Button className='bg-black text-white hover:bg-zinc-700 hover:text-white'><p>sign up</p></Button>
               </Link>
            </div>
         </section>
      </main>
   )
}
