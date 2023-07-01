"use client"

import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { FaMapMarker } from 'react-icons/fa'
import Image from 'next/image'
import axios from 'axios'
import QuotationAnimation from "../../../lottie/quotation.json"
import Lottie from "lottie-react";
import EditProfileModal from '@/components/EditProfileModal'
import Quote from '@/components/Quote'


type Params = {
   params: {
      user: any
   }
}
export default function Profile({ params }: { Params: Params }) {
   const { user } = useContext(AuthContext)
   const [userData, setUserData] = useState<any>(null)
   const [userQuotes, setUserQuotes] = useState<any>([])
   const router = useRouter()
   useEffect(() => {
      getUserData(params.id)
   }, [params])
   const getUserData = async (userID: string) => {
      try {
         const data = await axios.get(`/api/profile/${userID}`)
         setUserData(data.data)
         const quotes = await axios.get(`/api/quote/${userID}`)
         setUserQuotes(quotes.data)
         return data.data
      }
      catch (err) {
         setTimeout(() => {
            // router.push('/')
         }, 6000);
      }
   }
   return (
      <main className="flex min-h-screen flex-col p-12 gap-5">
         {userData ?
            <>
               <div className='flex gap-5 mt-0 md:mt-12'>
                  <Image src={userData.avatar != "" ? userData.avatar : "/logo.svg"} width={250} height={250} className="w-72 h-72 rounded-full" alt="profile picture" />
                  <div className='flex-col gap-3 md:flex hidden'>
                     <h1 className="text-2xl font-bold ">@{userData.username}</h1>
                     {user && params.id == user.uid &&
                        <>
                           <EditProfileModal userData={userData} userID={params.id} />
                        </>
                     }
                  </div>
               </div>
               <div className='flex flex-col gap-3 md:hidden'>
                  <h1 className="text-2xl font-bold">@{userData.username}</h1>
                  {user && params.id == user.uid &&
                     <>
                        <EditProfileModal userData={userData} userID={params.id} />
                     </>
                  }
               </div>
               <div className='p-4 border-gray-400 border'>
                  <div className='flex justify-between'>
                     <h2 className='text-xl font-bold mb-2'>About Me</h2>
                     <p className='flex items-start'><FaMapMarker />{userData.location}</p>
                  </div>
                  <blockquote className=''>{userData.bio}</blockquote>
               </div>
               {userQuotes.length > 0 ?
                  userQuotes.map((quote: any, index: number) => {
                     return <Quote key={quote.id} quote={quote} user={user} />
                  })
                  : <>
                     <p>this user has no quotes </p>
                  </>}
            </>
            :
            <>
               <div className='grid place-items-center w-full h-screen'>
                  <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }} className="md:hidden" />
                  <Lottie animationData={QuotationAnimation} style={{ width: 450, height: 450 }} className="md:block hidden" />
               </div>
            </>
         }
      </main>
   )
}
