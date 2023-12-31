"use client"

import { useState } from 'react'
import Input from '../Input';
import Button from '../Button';
import axios from "axios"
import { useRouter } from 'next/navigation';
export default function EditForm({
   userData,
   quoteData
}: {
   userData: any,
   quoteData: any
},
) {
   const [quote, setQuote] = useState({
      quote: quoteData.quote,
      authour: quoteData.authour,
      id: quoteData.id
   })

   const [buttontxt, setButtonTxt] = useState<string>("edit quote");
   const [errorMessage, setErrorMessage] = useState<string>("")
   const router = useRouter()
   const [disabled, setDisabled] = useState<boolean>(false);
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setButtonTxt("editing quote...");
      setDisabled(true)
      try {
         const request = await axios.patch(`/api/quote/${quoteData.id}`, { quote, userData })
         setButtonTxt("edited quote!");
         setTimeout(() => {
            router.push("/home")
         }, 1000)
      }
      catch (error: any) {
         setErrorMessage(error.response.data.error);
         setButtonTxt("edit quote");
      }
      setDisabled(false)
   }
   const handleChange = async (event: any) => {
      setQuote({ ...quote, [event.target.name]: event.target.value });
   }
   return <>
      <form className='flex flex-col w-full p-8 pt-4 md:pt-0 md:p-0'>
         <fieldset className='flex flex-col gap-2 w-full'>
            <Input label type="text" required name="quote" placeholder="quote" value={quote.quote} onChange={handleChange} />
            <Input label type="text" name="authour" placeholder="authour" value={quote.authour} onChange={handleChange} />
            <Button type="submit" onClick={handleSubmit} disabled={disabled} className="mt-2"><p>{buttontxt}</p></Button>

         </fieldset>
      </form>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
   </>
}