"use client"

import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignupForm'
import { useState } from 'react'
import Image from "next/image"

type Params = {
  params: {
     user: any
  }
  id: string
}

export default function Login({ params }: { params: Params }) {
  console.log(params)
  const [showSignIn, setShowSignIn] = useState(true)
  return (
    <main className="flex min-h-screen flex-col justify-center px-8 md:px-24 md:py-12 gap-2">
      <Image src="/logo.svg" width={200} height={200} className="self-center" alt="quoted logo" />
      <h1 className='mt-4 md:mt-0 text-2xl font-bold'>join quoted today!</h1>
      {showSignIn ? <>
        <SignInForm />
        <div className='flex'>
          <p>Don&apos;t have an account? 

          <a className='text-blue-500 cursor-pointer' onClick={() => setShowSignIn(false)}> Sign Up</a>
          </p>
        </div>
      </> : <>
        <SignUpForm />
        <div className='flex'>
          <p>Have an account already? 
          <a className='text-blue-500 cursor-pointer' onClick={() => setShowSignIn(true)}> Sign In</a>
          </p>
        </div>
      </>}

    </main>
  )
}
