import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export default function Button({
   children,
   type,
   disabled,
   onClick,
   className = "",
}: {
   children: ReactNode,
   type?: "submit" | "button" | undefined,
   disabled?: boolean,
   onClick?: (e:any) => void,
   className?: string,

}) {
   return (
      <button type={type} onClick={onClick} disabled={disabled} className={twMerge(`p-3 w-full bg-white rounded-lg text-black border-2 border-black text-xl hover:bg-zinc-200 hover:text-black transition-all  `, className)}>
         {children}
      </button>
   )
}