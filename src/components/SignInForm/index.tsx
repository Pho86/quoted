"use client"

import { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import axios from "axios"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase.config';

export default function SignInForm() {
   const [signup, setSignup] = useState({
      email: "",
      password: "",

   })
   const [buttontxt, setButtonTxt] = useState("Send Email");

   const [disabled, setDisabled] = useState(false);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      setButtonTxt("Sending...");
      setDisabled(true)
      e.preventDefault()
      console.log(signup)
      try {
         signInWithEmailAndPassword(auth, signup.email, signup.password);
         setButtonTxt("Sent!");
      }
      catch (error) {
         console.log(error)
         setButtonTxt("An error occurred.");
      }
      setDisabled(false)
   }
   const handleChange = async (event: any) => {
      setSignup({ ...signup, [event.target.name]: event.target.value });
   }
   return <>
      <form className='flex flex-col w-full'>
         <fieldset className='flex flex-col w-full'>
            <Input label type="email" required name="email" placeholder="email" value={signup.email} onChange={handleChange} />
            <Input label type="password" required name="password" placeholder="password" value={signup.password} onChange={handleChange} />
            <Button type="submit" onClick={handleSubmit} disabled={disabled}><p>signup</p></Button>
         </fieldset>
      </form>
   </>
}