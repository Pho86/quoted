"use client"

import { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import axios from "axios"

export default function CreateForm({
   userData
}: {
   userData: any
},
) {
   const [quote, setQuote] = useState({
      quote: "",
      authour: "",
   })

   const [buttontxt, setButtonTxt] = useState("Send Email");
   const [disabled, setDisabled] = useState(false);
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      setButtonTxt("Sending...");
      setDisabled(true)
      e.preventDefault()
      try {
         const request = await axios.post('/api/quote', { quote, userData })
         setButtonTxt("Sent!");
      }
      catch (error) {
         console.log(error)
         setButtonTxt("An error occurred.");
      }
      setDisabled(false)
   }
   const handleChange = async (event: any) => {
      setQuote({ ...quote, [event.target.name]: event.target.value });
   }
   return <>
      <form className='flex flex-col w-full'>
         <fieldset className='flex flex-col w-full'>
            <Input label type="text" required name="quote" placeholder="quote" value={quote.quote} onChange={handleChange} />
            <Input label type="text" required name="authour" placeholder="authour" value={quote.authour} onChange={handleChange} />
            <Button type="submit" onClick={handleSubmit} disabled={disabled}><p>create quote</p></Button>
         </fieldset>
      </form>
   </>
}