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
      <main className="flex min-h-screen flex-col p-12">
         <div>Quoted</div>
         {quotes.map((quote: any, i) => (
            <Quote key={quote.id} quote={quote} user={user}/>
         ))}
      </main>
   )
}
