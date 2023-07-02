"use client"

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<any>(null);
   useEffect(() => {
      const userstate = onAuthStateChanged(auth, (user: any) => {
         if (user) {
            // @ts-ignore
            console.log(user)
            setUser(user);
         } else {
            setUser(null);
         }
      });

      return () => userstate();
   }, []);
   return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}