"use client"

import { useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation';

import QuotationAnimation from "../../lottie/quotation.json"
import Lottie from "lottie-react";

export default function Profile() {

   // @ts-ignore
   const { user } = useAuthContext();
   const router = useRouter()
   
   useEffect(()=> {
      if (user === null) {
         router.push('/login')
      } else {
         router.push(`/profile/${user.uid}`)
      }}
   , [router, user])
  return (
    <main className="grid place-items-center w-full h-screen">
      <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }} className="md:hidden"/>
      <Lottie animationData={QuotationAnimation} style={{ width: 450, height: 450 }} className="md:block hidden"/>
    </main>
  )
}
