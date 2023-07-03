import Image from "next/image";
import Link from "next/link";
import { FaMapMarker } from "react-icons/fa";
import { PiCircleFill } from "react-icons/pi"
import { BsPencil } from "react-icons/bs"
export default function UserCard({ user, userData }: { user: any, userData: any }) {

   let formattedTimestamp
   if (userData.created_on) {
      formattedTimestamp =
         new Date(userData.created_on.seconds * 1000 + userData.created_on.nanoseconds / 1000000).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
         }) +
         " " +
         new Date(userData.created_on.seconds * 1000 + userData.created_on.nanoseconds / 1000000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
         });
   }

   return <div className="p-2 bg-zinc-50 transition-all border w-full rounded-lg">
      <div className="flex">
         <div className="flex gap-2">
            <Link href={`/profile/${user.uid}`}>
               <Image src={user.photoURL != "" ? user.photoURL ? user.photoURL === null ? "/logo.svg" : user.photoURL : "/logo.svg" : "/logo.svg"} width={250} height={250} className="w-36 hover:-translate-y-1 hover:brightness-[80%] hover:drop-shadow-lg transition-all h-36 rounded-full" alt="profile picture" />
            </Link>
            <div className="flex-col">
               <Link href={`/profile/${user.uid}`}>
                  <h2 className="text-xl hover:underline font-semibold hover:-translate-y-1 transition-all">{user.displayName}</h2>
               </Link>
               {userData &&
                  <>
                     <p className='flex items-start gap-1'><PiCircleFill color={"#a3e635"} />Online</p>
                     <p className='flex items-start gap-1'><FaMapMarker color={'#FDA4AF'} />{userData.location}</p>
                     <p className='flex items-start gap-1'><BsPencil color={'#27272a'} />{formattedTimestamp}</p>
                     <p>{userData.bio}</p>
                  </>
               }
            </div>
         </div>
      </div>
   </div>
}