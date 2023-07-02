"use client"
import QuotationAnimation from "../lottie/quotation.json"
import Lottie from "lottie-react";

export default function Loading() {
   
  return (
    <main className="grid place-items-center w-full h-screen max-h-screen">
      <Lottie animationData={QuotationAnimation} style={{ width: 300, height: 300 }} className="md:hidden"/>
      <Lottie animationData={QuotationAnimation} style={{ width: 450, height: 450 }} className="md:block hidden"/>
    </main>
  )
}
