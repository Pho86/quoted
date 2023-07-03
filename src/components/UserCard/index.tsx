import Image from "next/image";

export default function UserCard({ user }: { user: any }) { 
   console.log(user)
   return <div className="p-2 bg-zinc-50 transition-all border w-full rounded-lg">
      <div className="flex">
         <div className="flex">
         <Image src={user.photoURL != "" ? user.photoURL ? user.photoURL === null ? "/logo.svg" : user.photoURL : "/logo.svg" : "/logo.svg"} width={250} height={250} className="w-36 h-36 rounded-full" alt="profile picture" />
         <div className="flex-col">
         <h2 className="text-xl font-semibold">{user.displayName}</h2>
         <p></p>
         </div>
         </div>
      </div>
   </div>
}