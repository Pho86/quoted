"use client"
import CreateForm from '@/components/CreateForm'

import { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import Image from 'next/image'
export default function Create({ }) {
   // @ts-ignore
   const { user } = useAuthContext()
   const router = useRouter()
   useEffect(() => {
      if (user === null) {
         router.push('/')
      }
   }, [])
   return (
      <>
         <NavBar active={1} />
         <main className="flex min-h-screen flex-col p-0 md:p-24 md:pt-16 pt-0">
            <div className='w-full grid grid-cols-3 text-center px-8 py-4 border-b border-black'>
               <Image src="/logo.svg" width={25} height={25} className="visible md:invisible" alt="quoted logo" />
               <h1 className='font-bold text-2xl whitespace-nowrap -translate-x-5 md:-translate-x-0'>create a quote</h1>
            </div>
            <CreateForm userData={user} />
         </main>
      </>
   )
}
