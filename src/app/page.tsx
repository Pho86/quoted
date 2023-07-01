"use client"
import Image from 'next/image'
import SignUpForm from '@/components/SignupForm'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Quote from '@/components/Quote'
import { AuthContext } from '@/context/AuthContext'

export default function Home() {
   const [quotes, setQuotes] = useState([])

   const { user } = useContext(AuthContext)

   useEffect(() => {
      const getQuotes = async () => {
         const res = await axios.get('/api/quote')
         console.log(res.data)
         return res
      }
      getQuotes().then((res) => {
         setQuotes(res.data)
      })
         .catch(console.error);
   }, [])
   return (
      <main className="flex min-h-screen flex-col px-0 lg:px-16  md:py-12 mt-0 md:my-5">
         <section className='flex flex-col gap-2 px-8 mt-8 md:mt-16'>
            <h1 className='text-2xl font-bold mb-2'>recent quotes</h1>
            {quotes.map((quote: any, i) => (
               <Quote key={quote.id} quote={quote} user={user} />
            ))}
         </section>
      </main>
   )
}
