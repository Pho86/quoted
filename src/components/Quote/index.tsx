import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'

interface quoteInterface {
   quote: string
   authour: string
   avatar: string
   created_on: timeInterface
   updated_on?: timeInterface
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
      <Link href={`/profile/${quote.uid}`} className="w-full h-full">
         <div className='p-2 bg-zinc-100 hover:bg-zinc-200 transition-all border w-full'>
            <div className='flex w-full gap-2'>
               <Image src={quote.avatar} alt="avatar" width={100} height={100} style={{ objectFit: "fill" }} className="w-16 h-16 rounded-full" />
               <div className='flex gap-5 justify-between w-full'>
                  <div>
                     <div className='flex gap-3'>
                        <h2 className='font-medium text-2xl'>{quote.username}</h2>
                        <div className='flex flex-col'>
                        <p className='text-xs'>created on: {new Date(quote.created_on.seconds * 1000 + quote.created_on.nanoseconds / 1000000).toDateString()}</p>
                        <p>{quote.updated_on && <>updated on: {new Date(quote.updated_on.seconds * 1000 + quote.updated_on.nanoseconds / 1000000).toDateString()}</>}</p>
                        </div>
                     </div>
                     <div className='flex flex-col gap-3 justify-between'>
                        <blockquote className='text-md'>{quote.quote}</blockquote>
                        <p className='text-sm'>-{quote.authour}</p>
                     </div>
                  </div>
                  <div className='flex flex-col text-right'>
                     {user && user.uid === quote.uid && <p className='text-sm'>you</p>}
                  </div>
               </div>

            </div>
         </div>
      </Link>
   )
}