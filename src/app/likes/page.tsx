"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '@/context/AuthContext'
import NavBar from '@/components/NavBar'
import QuotationAnimation from "../../lottie/quotation.json"
import Lottie from "lottie-react";
import Image from 'next/image'
import Link from 'next/link'
import FavQuotes from '@/components/FavQuotes'
import { useRouter } from 'next/navigation'
export default function Likes() {
   const [quotes, setQuotes] = useState([])
   const [users, setUsers] = useState([])
   const [likes, setLikes] = useState([])
   const router = useRouter()

   // @ts-ignore
   const { user } = useAuthContext();
   useEffect(() => {
      if (user === null) {
         router.push('/login')
      }
      const getQuotes = async () => {
         const res = await axios.get('/api/quote')
         return res
      }
      const getUsers = async () => {
         const res = await axios.get('/api/users')
         return res
      }
      const getUserLikes = async () => {
         const res = await axios.get(`/api/profile/likes/${user.uid}`)
         return res
      }
      getQuotes().then((res) => {
         setQuotes(res.data)
      })
         .catch(console.error);
      getUsers().then((res) => {
         setUsers(res.data)
      })
         .catch(console.error)
      getUserLikes().then((res) => {
         setLikes(res.data)
      })
   }, [])
   return (
      <>
         {users.length > 0 && quotes.length > 0 ?
            <>
               <NavBar active={3} />
               <main className="flex min-h-screen h-screen flex-col px-6 md:px-24 md:py-0 mt-0">
                  <section className='flex flex-col gap-3 mt-6 mb-14 h-full '>
                     <Image src="/logo.svg" width={35} height={35} className="visible md:invisible" alt="quoted logo" />
                     <h1 className='text-2xl font-semibold'>liked quotes</h1>
                     {likes.length > 0 ? quotes.map((quote: any, i) => (
                        <FavQuotes key={quote.id} quote={quote} user={user} liked={likes} />
                     ))
                        :
                        <div className='flex flex-col gap-3 h-full justify-center items-center'>
                           <h2 className='text-lg'>you have no liked quotes yet ☹️</h2>
                           <Link href="/home" className='text-blue-500'>go like some quotes</Link>
                        </div>
                     }
                  </section>
               </main>
            </>
            :
            <div className='grid place-items-center w-full h-screen'>
               <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }} className="md:hidden" />
               <Lottie animationData={QuotationAnimation} style={{ width: 450, height: 450 }} className="md:block hidden" />
            </div>
         }
      </>
   )
}
