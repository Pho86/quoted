import Image from 'next/image'
import { FaEllipsisV, FaHeart, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

interface quoteInterface {
   quote: string
   authour: string
   avatar: string
   created_on: timeInterface
   updated_on?: timeInterface
   uid: string
   username: string
   id: string
   likes: number
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

export default function FavQuotes({
   quote,
   user,
   liked
}: {
   quote: quoteInterface
   user: userInterface,
   liked: any
}) {
   const [openMenu, setOpenMenu] = useState(false)
   const router = useRouter()
   const [active, setActive] = useState(true)
   const [likedQuote, setLikedQuote] = useState(false)

   useEffect(() => {
      for (let i = 0; i < liked.length; i++) {
         if (quote.id === liked[i].quoteid) {
            setLikedQuote(true)
         }
      }

   }, [liked, quote.id])

   const likeQuote = async () => {
      if (likedQuote) {
         const request = await axios.put(`/api/quote/likes/${quote.id}/`, { user, quoteid: quote.id })
         if(quote.likes === undefined) quote.likes = 0
         quote.likes -= 1
         setLikedQuote(false)
      } else {
         const request = await axios.post(`/api/quote/likes/${quote.id}/`, { user, quoteid: quote.id })
         if(quote.likes === undefined) quote.likes = 0
         setLikedQuote(true)
         quote.likes += 1
      }
   }
   const deleteQuote = async () => {
      setActive(false)
      try {
         const request = await axios.put(`/api/quote/${quote.id}/`, { user, quoteuid: quote.uid })
      }
      catch (error) {
         console.log(error)
      }
   }
   const editQuote = async () => {
      router.push(`/edit/${quote.id}`)
   }

   let formattedTimestamp;
   if (quote.created_on) {
      formattedTimestamp =
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
   }
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
         <AnimatePresence>
            {likedQuote ? <motion.div className='p-2 bg-zinc-50 transition-all border w-full rounded-lg' exit={{ opacity: 0, backgroundColor: ['hsl(0,0%,98%)', 'hsl(352.6,95.7%,81.8%)'] }} transition={{ duration: 0.3, opacity: { duration: 1.2 } }}>
               <div className='flex w-full gap-2'>
                  <Link href={`/profile/${quote.uid}`} className="grid">
                     <Image src={quote.avatar} alt="avatar" width={100} height={100} style={{ objectFit: "fill" }} className="w-[4.25rem] h-16 shrink-0 aspect-square hidden md:block rounded-full hover:brightness-75 transition-all" />
                     <Image src={quote.avatar} alt="avatar" width={100} height={100} style={{ objectFit: "fill" }} className="w-16 h-14 shrink-0 aspect-square md:hidden rounded-full hover:brightness-75 transition-all" />
                  </Link>
                  <div className='flex gap-5 justify-between w-full'>
                     <div>
                        <div className='flex gap-3'>
                           <Link href={`/profile/${quote.uid}`} className="transition-all hover:underline ">
                              <h2 className='font-medium text-2xl whitespace-nowrap hidden md:block'>{quote.username.length > 25 ? `${quote.username.substring(0, 10)}...` : quote.username}</h2>
                              <h2 className='font-medium text-2xl whitespace-nowrap md:hidden'>{quote.username.length > 10 ? `${quote.username.substring(0, 10)}...` : quote.username}</h2>
                           </Link>
                           <div className='flex flex-col'>
                              <p className='text-xs flex whitespace-nowrap'><span className='hidden md:block'>created:&nbsp;</span>{formattedTimestamp}</p>
                              {quote.updated_on && <p className='text-xs flex whitespace-nowrap'> <><span className='hidden md:block'>updated:&nbsp;</span>{updatedTimestamp}</></p>}
                           </div>
                        </div>
                        <div className='flex flex-col gap-3 justify-between'>
                           <blockquote className='text-md'>{quote.quote}</blockquote>
                           <p className='text-sm text-gray-500'>– {quote.authour}</p>
                        </div>
                     </div>
                     <div className='flex flex-col gap-2'>
                        <div className='flex gap-1 text-rose-500'>
                           {likedQuote ? <FaHeart onClick={likeQuote} className='text-rose-500 cursor-pointer' size={20} /> :
                              <FaRegHeart onClick={likeQuote} className='text-rose-500 cursor-pointer' size={20} />}
                           {quote.likes ? quote.likes : 0}
                        </div>
                        {user && user.uid === quote.uid && <p className='flex justify-end'><FaEllipsisV className='cursor-pointer' onClick={() => { setOpenMenu(!openMenu) }} /></p>}
                        {openMenu && <div className='flex flex-col bg-white absolute border rounded -translate-x-20 translate-y-4'>
                           <ul>
                              <li className='cursor-pointer whitespace-nowrap hover:bg-zinc-200 p-1' onClick={editQuote}>edit quote</li>
                              <li className='cursor-pointer whitespace-nowrap hover:bg-zinc-200 p-1' onClick={deleteQuote}>delete quote</li>
                              <li className='cursor-pointer whitespace-nowrap hover:bg-zinc-200 p-1' onClick={() => { setOpenMenu(false); }}>cancel</li>
                           </ul>
                        </div>}
                     </div>
                  </div>
               </div>
            </motion.div> :
               null
            }
         </AnimatePresence>
      </>
   )
}