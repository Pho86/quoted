import { db } from "../../../../../firebase/firebase.config";
import { doc, getDoc, deleteDoc, updateDoc, Timestamp } from "firebase/firestore";
import { NextResponse } from 'next/server'

export async function GET(req: any, res: any) {
   let quotedata;
   console.log(res.params.id)
   if (res.params.id) {
      const docRef = doc(db, "quotes", res.params.id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return NextResponse.json({ error: "invalid quote id" }, { status: 401 })
      quotedata = { ...docSnap.data(), id: docSnap.id }
      return NextResponse.json(quotedata)
   }
   else {
      return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
   }
}

export async function PUT(req: any, res: any) {
   const data = await req.json()
   if (data.user.uid === data.quoteuid) {
      await deleteDoc(doc(db, "quotes", res.params.id));
   }
   else {
      return NextResponse.json({ error: "You don't own this quote" }, { status: 401 })
   }
   return NextResponse.json(data)
}

export async function PATCH(req: any, res: any) {
   let { quote, userData } = await req.json()
   if (userData.photoURL === null || userData.photoURL === undefined || userData.photoURL === "") {
      userData.photoURL = "https://firebasestorage.googleapis.com/v0/b/quoted-5a75d.appspot.com/o/profileImages%2FQUOTEDLOGO.png?alt=media&token=77ddde79-fa22-4726-8c26-928f1cbea25a"
   }
   console.log(userData.uid, quote, res.params.id)
   if (res.params.id) {
      
      const docRef = doc(db, "quotes", res.params.id);
      await updateDoc(docRef, {
         quote: quote.quote,
         authour: quote.authour,
         updated_on: Timestamp.fromDate(new Date()),
         avatar: userData.photoURL,
         name: userData.displayName,
      });
      return NextResponse.json(quote)
   }
   else {
      return NextResponse.json({ error: "Wrong user id" }, { status: 401 })
   }
}