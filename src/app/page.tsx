"use client"
import Image from 'next/image'
import SignUpForm from '@/components/SignupForm'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Quote from '@/components/Quote'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
export default function Home() {
   
// @ts-ignore
   const { user } = useContext(AuthContext)
   const router = useRouter()

   useEffect(()=> {
      if (user === null) {
         router.push('/login')
      } else {
         router.push(`/home`)
      }}
   , [router, user])

   return (
      <main className="flex min-h-screen flex-col px-0 lg:px-16  md:py-12 mt-0 md:my-5">
         <section className='flex flex-col gap-2 px-8 mt-8 md:mt-16'>
            
         </section>
      </main>
   )
}
