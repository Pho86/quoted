"use client"

import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignupForm'
import { useState } from 'react'
export default function Login() {

  const [showSignIn, setShowSignIn] = useState(false)
  return (
    <main className="flex min-h-screen flex-col p-8 md:p-16 md:pt-16 gap-1">
      <h1 className='mt-0 md:mt-12 font-bold'>join quoted today!</h1>
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
