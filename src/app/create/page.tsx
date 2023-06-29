"use client"
import CreateForm from '@/components/CreateForm'
import Image from 'next/image'

import { useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export default function Home({ }) {
   const { user } = useContext(AuthContext)

   useEffect(() => {

   }, [])
   return (
      <main className="flex min-h-screen flex-col p-16">
         <CreateForm userData={user} />
      </main>
   )
}
