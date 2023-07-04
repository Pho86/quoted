"use client"
import EditForm from '@/components/EditForm'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import QuotationAnimation from "../../../lottie/quotation.json"
import Lottie from "lottie-react"
import axios from 'axios'
import NavBar from '@/components/NavBar'
import Image from 'next/image'
type Params = {
   params: {
      user: any
   }
   id: string
}

export default function EditPage({ params }: { params: Params }) {
   // @ts-ignore
   const { user } = useAuthContext()
   const router = useRouter()
   const [quoteData, setQuoteData] = useState()
   
   useEffect(() => {
      getQuote()
   }, [])
   const getQuote = async () => {
      const response = await axios.get(`/api/quote/${params.id}/`)
      setQuoteData(response.data)
      if (user.uid != response.data.uid || user.uid == null) {
         router.push('/home')
      }
      return response.data
   }

   return (
      <>
         {quoteData ?
            <>
               <NavBar active={2} />
               <main className="flex min-h-screen flex-col p-0 md:p-24 md:pt-16 pt-0">
                  <div className='w-full grid grid-cols-3 text-center px-8 py-4 border-b border-black'>
                     <Image src="/logo.svg" width={25} height={25} className="visible md:invisible" alt="quoted logo" />
                     <h1 className='font-bold text-2xl whitespace-nowrap -translate-x-2 md:-translate-x-0'>create a quote</h1>
                  </div>
                  <EditForm userData={user} quoteData={quoteData} />
               </main>
            </>
            :
            <main className="grid place-items-center w-full h-screen">
               <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }} className="md:hidden" />
               <Lottie animationData={QuotationAnimation} style={{ width: 450, height: 450 }} className="md:block hidden" />
            </main>
         }
      </>
   )
}
