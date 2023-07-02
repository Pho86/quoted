"use client"
import CreateForm from '@/components/CreateForm'

import { useEffect } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
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
      <main className="flex min-h-screen flex-col p-0 md:p-16 md:pt-16 pt-0">
         <div className='w-full text-center p-4 border-b border-black'>
            <h1 className='font-bold'>create a quote</h1>
         </div>
         <CreateForm userData={user} />
      </main>
   )
}
