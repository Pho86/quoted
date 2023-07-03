"use client";

import Image from "next/image"
import Link from "next/link";
import { AiOutlineHome, AiFillHome, AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/ai"
import Button from "../Button";
import { useAuthContext } from "@/context/AuthContext";
export default function NavBar({

   active
}: {
   active: number
}) {
   // @ts-ignore
   const { user } = useAuthContext();
   return (
      <>
         <nav className="fixed top-0 w-screen text-black border-b-2 bg-white px-8 md:px-24 py-2 md:grid grid-cols-3 justify-between items-center z-[1000] scroll-smooth hidden">
            <div className="flex items-center gap-5">
               <div className="font-bold text-2xl transition-all py-1 hover:bg-zinc-100 rounded-md p-2">
                  <Link href="/home" className="flex gap-2 items-center">
                     <h1 className="whitespace-nowrap">quoted</h1>
                     <Image src="/logo.svg" width={25} height={25} alt="quoted logo" />
                  </Link>
               </div>
               <Link href={"/home"} className="text-lg p-2 transition-all rounded-md hover:bg-zinc-100">
                  <h2>Home</h2>
               </Link>
            </div>
            <Link href="/create" className=" transition-all place-self-center p-2" >
               <AiFillPlusCircle size={30} className="hover:-translate-y-1 transition-all" />
            </Link>
            {user ?
               <Link href="/profile" className="place-self-end self-center">
                  <Image src={user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"} width={35} height={35} className="w-10 h-10 group-hover:-translate-y-1 hover:brightness-[80%] hover:drop-shadow-lg transition-all rounded-full" alt="your profile image" />
               </Link>
               :
               <>
                  <Link href="/profile" className="place-self-end self-center hover:bg-zinc-100">
                     <Button className="text-sm"><p>sign in</p> </Button>
                  </Link>
               </>
            }
         </nav>

         <nav className="fixed bottom-0 w-screen text-black bg-white border-t-2 border-zinc-500 grid grid-cols-3 justify-between items-center z-[1000] md:hidden">
            {active === 0 ? <Link href={"/home"} className="transition-all bg-zinc-300 p-4 w-full grid place-items-center">
               <AiFillHome size={30} />
               <p className="font-bold">◍</p>
            </Link>
               :
               <Link href={"/home"} className="transition-all hover:bg-zinc-100 p-4 w-full grid place-items-center">
                  <AiOutlineHome size={30} />
                  <p>home</p>
               </Link>
            }

            {active === 1 ? <Link href={"/create"} className="transition-all bg-zinc-300 p-4 w-full grid place-items-center">
               <AiFillPlusCircle size={30} />
               <p className="font-bold">◍</p>
            </Link>
               :
               <Link href={"/create"} className="transition-all hover:bg-zinc-100 p-4 w-full grid place-items-center">
                  <AiOutlinePlusCircle size={30} />
                  <p>create</p>
               </Link>
            }

            {active === 2 ?
               <Link href="/profile" className="place-self-end self-center bg-zinc-300 hover:bg-zinc-100 w-full h-full grid place-items-center p-4">
                  {user ? <Image src={user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"} width={35} height={35} className="w-8 h-8 rounded-full" alt="your profile image" />
                     :
                     <Image src={"https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"} width={35} height={35} className="w-8 h-8 rounded-full" alt="your profile image" />
                  }
                  <p className="font-bold">◍</p>
               </Link>
               :
               <Link href="/profile" className="place-self-end self-center hover:bg-zinc-100 w-full h-full grid place-items-center p-4">
                  {user ? <Image src={user.photoURL ? user.photoURL : "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"} width={35} height={35} className="w-8 h-8 rounded-full" alt="your profile image" />
                     :
                     <Image src={"https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"} width={35} height={35} className="w-8 h-8 rounded-full" alt="your profile image" />
                  }
                  <p>profile</p>
               </Link>
            }
         </nav>

      </>
   )
}