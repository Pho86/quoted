"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import Quote from '@/components/Quote'
import { useAuthContext } from '@/context/AuthContext'
import NavBar from '@/components/NavBar'
import UserCard from '@/components/UserCard'
import UsersList from '@/components/Users';
import QuotationAnimation from "../../lottie/quotation.json"
import Lottie from "lottie-react";
import Image from 'next/image'
export default function Home() {
   const [quotes, setQuotes] = useState([])
   const [users, setUsers] = useState([])
   const [userData, setUserData] = useState({})
   // @ts-ignore
   const { user } = useAuthContext();
   useEffect(() => {
      const getQuotes = async () => {
         const res = await axios.get('/api/quote')
         return res
      }
      const getUsers = async () => {
         const res = await axios.get('/api/users')
         return res
      }
      const getUserData = async () => {
         const res = await axios.get(`/api/profile/${user.uid}`)
         console.log(res.data)
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
      getUserData().then((res) => {
         setUserData(res.data)
        
      })
   }, [])
   return (
      <>
         {users.length > 0 && quotes.length > 0 ?
            <>
               <NavBar active={0} />
               <main className="flex min-h-screen flex-col px-6 md:px-24 md:py-0 mt-0">
                  <section className='flex flex-col gap-3 mt-6 mb-14'>
                     <Image src="/logo.svg" width={35} height={35} className="visible md:invisible" alt="quoted logo" />
                     {user && <>
                        <h1 className='text-3xl font-semibold'>welcome <span className=''>{user.displayName}</span>!</h1>
                        <UserCard user={user} userData={userData}/>
                     </>
                     }
                     <h2 className='text-2xl font-semibold'>other quoters...</h2>
                     {users && <UsersList users={users} />}
                     <h1 className='text-2xl font-semibold'>recently posted quotes</h1>
                     {quotes.map((quote: any, i) => (
                        <Quote key={quote.id} quote={quote} user={user} />
                     ))}
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
