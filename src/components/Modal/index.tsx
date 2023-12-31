import React, { ReactNode, useState } from "react";
import Button from "../Button";

export default function Modal({
   children,
   title,
   buttonText,
   showModalProp = false,
   buttonClass,
   buttonClick,
   confirmationText = "confirm",
   disabled = false
}: {
   children: ReactNode;
   title: string;
   buttonText?: string;
   confirmationText?: string
   showModalProp?: boolean;
   buttonClass?: string;
   buttonClick?: (e: React.FormEvent<HTMLFormElement>) => any;
   disabled?: boolean;
}) {
   const [showModal, setShowModal] = useState(showModalProp);
   return (
      <>
         {buttonText && (
            <Button
               className={buttonClass}
               type="button"
               onClick={() => setShowModal(true)}
            >
               {buttonText}
            </Button>
         )}
         {showModal ? (
            <>
               <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none pointer-events-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl pointer-events-auto">
                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                           <h3 className="text-3xl font-semibold">{title}</h3>
                           <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                           >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                 ×
                              </span>
                           </button>
                        </div>
                        {children}

                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                           <button
                              className="text-rose-500 hover:bg-zinc-100 rounded-lg background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                           >
                              cancel
                           </button>
                           <Button
                              type="button"
                              onClick={buttonClick}
                              disabled={disabled}
                           >
                              {confirmationText}
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
               <div
                  className="opacity-25 fixed inset-0 z-40 bg-black"
                  onClick={() => {
                     setShowModal(false);
                  }}
               ></div>
            </>
         ) : (
            <></>
         )}
      </>
   );
}
