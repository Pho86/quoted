"use client"
import CreateForm from '@/components/CreateForm'
import Image from 'next/image'

import { useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
export default function Home({ }) {
   const { user } = useContext(AuthContext)
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
