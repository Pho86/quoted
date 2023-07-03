import Link from "next/link";
import Image from "next/image";
export default function UsersList({ users }: { users: any }) {

   return <div className="flex overflow-x-scroll gap-3 no-scrollbar">
      {users && users.map((user: any) => {
         if (user.hideProfile === false || user.hideProfile === undefined) {
            return <Link href={`/profile/${user.id}`} key={user.id} className="flex-shrink-0 group">
               <div key={user.uid} className="p-2">
                  <Image src={user.avatar != "" ? user.avatar ? user.avatar === null ? "/logo.svg" : user.avatar : "/logo.svg" : "/logo.svg"} className="w-20 h-20 hidden md:flex rounded-full group-hover:-translate-y-1 group-hover:brightness-[80%] group-hover:drop-shadow-lg transition-all" alt={`${user.username}'s profile picture`} width={100} height={100} />
                  <Image src={user.avatar != "" ? user.avatar ? user.avatar === null ? "/logo.svg" : user.avatar : "/logo.svg" : "/logo.svg"} className="w-16 h-16 md:hidden flex rounded-full group-hover:-translate-y-1 group-hover:brightness-[80%] group-hover:drop-shadow-lg transition-all" alt={`${user.username}'s profile picture`} width={100} height={100} />
                  <p className="text-center text-sm font-semibold group-hover:-translate-y-1 transition-all">{user.username.length > 10 ? `${user.username.substring(0, 10)}...` : user.username}</p>
               </div>
            </Link>
         }
      })}
   </div>
} 