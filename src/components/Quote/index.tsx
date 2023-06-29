import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'

interface quoteInterface {
   quote: string
   authour: string
   avatar: string
   created_on: timeInterface
   updated_on?: Date
   uid: string
   username: string
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
}: {
   quote: quoteInterface,
   user: userInterface;
}) {
   return (
      <div className='p-2'>
         <div className='flex gap-5'>
            <div className='flex gap-1'>
               <Image src={quote.avatar} alt="avatar" width={100} height={100} style={{ objectFit: "fill" }} className="w-10 h-10 rounded-full" />
               <h2>{quote.username}</h2>
            </div>
            <div className='flex flex-col text-right'>
               <p>created on: {new Date(quote.created_on.seconds * 1000 + quote.created_on.nanoseconds / 1000000).toDateString()}</p>
               <p>{quote.updated_on && <>updated on: {quote.updated_on}</>}</p>
               {user.uid === quote.uid && <p className='text-sm'>you</p>}
            </div>
         </div>
         <div className='flex flex-col gap-3 justify-between'>
            <blockquote className='font-medium'>{quote.quote}</blockquote>
            <p className='text-sm'>- {quote.authour}</p>
         </div>
      </div>
   )
}