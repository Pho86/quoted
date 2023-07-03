"use client"

import { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import axios from "axios"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.config';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
export default function SignInForm() {
   const [signup, setSignup] = useState({
      email: "",
      password: "",

   })
   const [buttontxt, setButtonTxt] = useState<string>("sign in");

   const [disabled, setDisabled] = useState<boolean>(false);
   const router = useRouter();
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      setButtonTxt("signing in")
      setDisabled(true)
      e.preventDefault()
      try {
         signInWithEmailAndPassword(auth, signup.email, signup.password);
         setButtonTxt("signed in");
         router.push("/")
      }
      catch (error) {
         console.log(error)
         setButtonTxt("error.");
      }
      setDisabled(false)
   }
   const handleChange = async (event: any) => {
      setSignup({ ...signup, [event.target.name]: event.target.value });
   }
   return <>
      <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
         <form className='flex flex-col w-full'>
            <fieldset className='flex flex-col w-full gap-2'>
               <Input label type="email" required name="email" placeholder="email" value={signup.email} onChange={handleChange} />
               <Input label type="password" required name="password" placeholder="password" value={signup.password} onChange={handleChange} />
               <Button type="submit" onClick={handleSubmit} className="my-4" disabled={disabled}><p>{buttontxt}</p></Button>
            </fieldset>
         </form>
      </motion.div>
   </>
}