"use client"

import { useContext, useEffect } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from 'next/navigation';

import QuotationAnimation from "../../lottie/quotation.json"
import Lottie from "lottie-react";

export default function Profile() {
   const { user} = useContext(AuthContext)
   const router = useRouter()
   
   useEffect(()=> {
      if (user === null) {
         router.push('/')
      } else {
         router.push(`/profile/${user.uid}`)
      }}
   , [router, user])
  return (
    <main className="flex min-h-screen flex-col p-12">
      <div>Quoted</div>

      <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }}/>
    </main>
  )
}
