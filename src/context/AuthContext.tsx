"use client"

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';

export const AuthContext = createContext({});
// export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState(null);
   useEffect(() => {
      const userstate = onAuthStateChanged(auth, (user) => {
         if (user) {
            // @ts-ignore
            setUser(user);
         } else {
            setUser(null);
         }
      });

      return () => userstate();
   }, []);
   return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}