import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'
import { FaEllipsisV } from 'react-icons/fa'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { useRouter } from 'next/navigation'

interface quoteInterface {
   quote: string
   authour: string
   avatar: string
   created_on: timeInterface
   updated_on?: timeInterface
   uid: string
   username: string
   id: string
}

interface timeInterface {
   seconds: number
   nanoseconds: number
}

interface userInterface {
   uid: string
   username: string
   avatar: string
}

export default function Quote({
   quote,
   user,
   link = false

}: {
   quote: quoteInterface
   user: userInterface
   link?: boolean
}) {
   const [openMenu, setOpenMenu] = useState(false)
   const router = useRouter()
   const deleteQuote = async () => {
      try {
         const request = await axios.put(`/api/quote/${quote.id}/`, { user, quoteuid: quote.uid })
         router.refresh()
      }
      catch (error) {
         console.log(error)
      }
   }
   const editQuote = async () => {
      router.push(`/edit/${quote.id}`)
   }

   const formattedTimestamp =
      new Date(quote.created_on.seconds * 1000 + quote.created_on.nanoseconds / 1000000).toLocaleDateString("en-US", {
         month: "2-digit",
         day: "2-digit",
         year: "2-digit",
      }) +
      " " +
      new Date(quote.created_on.seconds * 1000 + quote.created_on.nanoseconds / 1000000).toLocaleTimeString("en-US", {
         hour: "2-digit",
         minute: "2-digit",
      });
   let updatedTimestamp;
   if (quote.updated_on) {
      updatedTimestamp =
         new Date(quote.updated_on.seconds * 1000 + quote.updated_on.nanoseconds / 1000000).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
         }) +
         " " +
         new Date(quote.updated_on.seconds * 1000 + quote.updated_on.nanoseconds / 1000000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
         });
   }
   return (
      <>
         <div className='p-2 bg-zinc-50 transition-all border w-full rounded-lg'>
            <div className='flex w-full gap-2'>
               <Link href={`/profile/${quote.uid}`} className="">
                  <Image src={quote.avatar} alt="avatar" width={100} height={100} style={{ objectFit: "fill" }} className="w-16 h-16 rounded-full hover:brightness-75 transition-all" />
               </Link>
               <div className='flex gap-5 justify-between w-full'>
                  <div>
                     <div className='flex gap-3'>
                        <Link href={`/profile/${quote.uid}`} className="transition-all hover:underline ">
                           <h2 className='font-medium text-2xl'>{quote.username}</h2>
                        </Link>
                        <div className='flex flex-col'>
                           <p className='text-xs'>created on: {formattedTimestamp}</p>
                           <p className='text-xs'>{quote.updated_on && <>updated on: {updatedTimestamp}</>}</p>
                        </div>
                     </div>
                     <div className='flex flex-col gap-3 justify-between'>
                        <blockquote className='text-md'>{quote.quote}</blockquote>
                        <p className='text-sm'>– {quote.authour}</p>
                     </div>
                  </div>
                  <div className='flex flex-col text-right'>
                     {user && user.uid === quote.uid && <p className='text-sm'><FaEllipsisV className='cursor-pointer' onClick={() => { setOpenMenu(!openMenu) }} /></p>}
                     {openMenu && <div className='flex flex-col bg-white absolute border rounded -translate-x-24'>
                        <ul>
                           <li className='cursor-pointer whitespace-nowrap hover:bg-zinc-200 p-1' onClick={editQuote}>edit quote</li>
                           <li className='cursor-pointer whitespace-nowrap hover:bg-zinc-200 p-1' onClick={deleteQuote}>delete quote</li>
                           <li className='cursor-pointer whitespace-nowrap hover:bg-zinc-200 p-1' onClick={()=>{setOpenMenu(false);}}>cancel</li>
                        </ul>
                     </div>}
                  </div>
               </div>

            </div>
         </div>
      </>
   )
}