"use client"
import EditForm from '@/components/EditForm'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import QuotationAnimation from "../../../lottie/quotation.json"
import Lottie from "lottie-react"
import axios from 'axios'

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
      console.log(response.data)
      if (user.uid != response.data.uid || user.uid == null) {
         router.push('/home')
      }
      return response.data
   }

   return (
      <>
         {quoteData ?
            <main className="flex min-h-screen flex-col p-0 md:p-24 md:pt-16 pt-0">
               <div className='w-full text-center p-4 border-b border-black'>
                  <h1 className='font-bold'>edit your quote</h1>
               </div>
               <EditForm userData={user} quoteData={quoteData} />
            </main>
            :
            <main className="grid place-items-center w-full h-screen">
               <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }} className="md:hidden" />
               <Lottie animationData={QuotationAnimation} style={{ width: 450, height: 450 }} className="md:block hidden" />
            </main>
         }
      </>
   )
}
