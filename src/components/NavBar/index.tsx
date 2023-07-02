"use client";

import Image from "next/image"
import Link from "next/link";
import { FaPlusCircle, FaUser, FaHome } from "react-icons/fa";
import Button from "../Button";
import { useAuthContext } from "@/context/AuthContext";
export default function NavBar({
   home = false
}: {
   home?: boolean
}) {
   // @ts-ignore
   const { user } = useAuthContext();
   return (
      <>
         <nav className="fixed top-0 w-screen text-black border-b-2 bg-white px-8 md:px-16 py-2 md:grid grid-cols-3 justify-between items-center z-[1000] scroll-smooth hidden">
            <div className="flex items-center gap-5">
               <div className="font-bold text-2xl hover:drop-shadow-primary-sm transition-all py-1 hover:bg-zinc-100 p-2">
                  <Link href="/home" className="flex gap-2 items-center">
                     <h1 className="whitespace-nowrap">quoted</h1>
                     <Image src="/logo.svg" width={25} height={25} alt="quoted logo" />
                  </Link>
               </div>
               <Link href={"/home"} className="text-lg p-2 hover:drop-shadow-primary-sm transition-all hover:bg-zinc-100">
                  <h2>Home</h2>
               </Link>
            </div>
            <Link href="/create" className="hover:drop-shadow-primary-sm transition-all place-self-center" >
               <FaPlusCircle size={30} />
            </Link>
            {user ?
               <Link href="/profile" className="place-self-end self-center hover:bg-zinc-100">
                  <Image src={user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"} width={35} height={35} className="w-8 h-8 rounded-full" alt="your profile image" />
               </Link>
               :
               <>
                  <Link href="/profile" className="place-self-end self-center hover:bg-zinc-100">
                     <Button className="text-sm"><p>Profile</p> </Button>
                  </Link>
               </>
            }
         </nav>

         <nav className="fixed bottom-0 w-screen text-black bg-white border-t-2 border-zinc-500 bg-whit grid grid-cols-3 justify-between items-center z-[1000] scroll-smooth md:hidden">
            <Link href={"/"} className="font-bold text-lg p-4 hover:drop-shadow-primary-sm transition-all hover:bg-zinc-100 w-full grid place-items-center">
               <FaHome size={30} />
            </Link>
            <Link href="/create" className="hover:drop-shadow-primary-sm transition-all place-self-center hover:bg-zinc-100 w-full h-full grid place-items-center p-4">
               <FaPlusCircle size={30} />
            </Link>
            <Link href="/profile" className="place-self-end self-center hover:bg-zinc-100 w-full h-full grid place-items-center p-4">
               <FaUser size={30} />
            </Link>
         </nav>

      </>
   )
}